'use client';

import axiosInstance from "@/app/api/axiosInstance";
import {createContext, useContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";

export const AppContext = createContext({
    // Default values to prevent destructuring errors during migration
    currency: 'Rs',
    router: null,
    userData: null,
    setUserData: () => {},
    fetchUserData: async () => {},
    fetchProductData: async () => {},
    products: [],
    categories: [],
    cartItems: [],
    setCartItems: () => {},
    cartObj: [],
    setCartObj: () => {},
    addToCart: () => {},
    removeFromCart: () => {},
    updateCartQuantity: () => {},
    cartCount: 0,
    cartAmount: 0,
    cartLoading: false
});

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        console.warn('useAppContext is being used outside of AppContextProvider. This is deprecated. Please use the new context hooks: useAuth, useProducts, useCart');
        // Return default values to prevent crashes
        return {
            currency: 'Rs',
            router: null,
            userData: null,
            setUserData: () => {},
            fetchUserData: async () => {},
            fetchProductData: async () => {},
            products: [],
            categories: [],
            cartItems: [],
            setCartItems: () => {},
            cartObj: [],
            setCartObj: () => {},
            addToCart: () => {},
            removeFromCart: () => {},
            updateCartQuantity: () => {},
            cartCount: 0,
            cartAmount: 0,
            cartLoading: false
        };
    }
    return context;
};

export const AppContextProvider = ({ children }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY || 'Rs';
    const router = useRouter();

    const [userData, setUserData] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartObj, setCartObj] = useState([]);
    const [cartAmount, setCartAmount] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const [cartLoading, setCartLoading] = useState(true);

    const fetchProductData = async (filters = {}) => {
        try {
            const params = new URLSearchParams(filters).toString();

            const { data } = await axiosInstance.get(`/products?${params}`);
            if (data.status) {
                return {
                    products: data.data.products,
                };
            } else {
                toast.error(data.message || 'Failed to load products');
                return null;
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Error fetching products');
            return null;
        }
    };
    const fetchCategoriesData = async () => {
        try {

            const { data } = await axiosInstance.get(`/categories`);
            if (data.status) {
                setCategories(data.data)
            } else {
                toast.error(data.message || 'Failed to load Categories');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Error fetching Categories');
        }
    };

    const fetchCartProducts = async () => {
        setCartLoading(true);

        try {
            const storedCart = localStorage.getItem('cart');
            const cart = storedCart ? JSON.parse(storedCart) : {};

            const { data } = await axiosInstance.post('/cart-products', { cart });

            if (data?.status) {
                setCartItems(data.data.cartProducts || []);
            } else {
                toast.error(data?.message || 'Failed to load cart');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Error loading cart');
        } finally {
            setCartLoading(false);
        }
    };


    const fetchUserData = async () => {
        try {
            const { data } = await axiosInstance.get('/get-user');
            if (data.status) {
                setUserData(data.data.user);
            } else {
                toast.error(data.message || 'Failed to fetch user data');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'User fetch error');
        }
    };

    const addToCart = (product) => {
        console.log(product);
        try {
            const productId = product.id;
            const stock = product.stock ?? 0;
            const cart = JSON.parse(localStorage.getItem('cart')) || {};
            const currentQty = cart[productId]?.quantity || 0;

            if (currentQty >= stock) {
                toast.error(`Only ${stock} in stock`);
                return;
            }

            const newQty = currentQty + 1;
            cart[productId] = { quantity: newQty };
            localStorage.setItem('cart', JSON.stringify(cart));

            setCartItems((prev) => {
                const existing = prev.find(p => p.id === productId);
                if (existing) {
                    return prev.map(p =>
                        p.id === productId ? { ...p, pivot: { quantity: newQty } } : p
                    );
                } else {
                    return [...prev, { ...product, pivot: { quantity: newQty } }];
                }
            });

            toast.success('Item added to cart');
        } catch (err) {
            console.error(err);
            toast.error('Failed to add to cart');
        }
    };

    const removeFromCart = (itemId) => {
        try {
            const cart = JSON.parse(localStorage.getItem('cart')) || {};
            delete cart[itemId];
            localStorage.setItem('cart', JSON.stringify(cart));
            setCartItems((prev) => prev.filter(item => item.id !== itemId));
            toast.success('Item removed from cart');
        } catch (err) {
            console.error(err);
            toast.error('Error removing item');
        }
    };

    const updateCartQuantity = (itemId, quantity) => {
        try {
            const cart = JSON.parse(localStorage.getItem('cart')) || {};
            if (!cart[itemId]) {
                toast.error('Item not found in cart');
                return;
            }

            const product = cartItems.find(p => p.id === itemId);
            if (!product) return;

            const stock = product.stock ?? 0;
            if (quantity > stock) {
                toast.error(`Only ${stock} in stock`);
                return;
            }

            if (quantity <= 0) {
                delete cart[itemId];
                setCartItems(prev => prev.filter(item => item.id !== itemId));
                toast.success('Item removed from cart');
            } else {
                cart[itemId].quantity = quantity;
                setCartItems(prev => prev.map(item =>
                    item.id === itemId ? { ...item, pivot: { quantity } } : item
                ));
                toast.success('Cart updated');
            }

            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (err) {
            console.error(err);
            toast.error('Failed to update cart');
        }
    };

    const updateCartCount = () => {
        const count = cartItems.reduce((sum, item) => sum + (item.pivot?.quantity || 0), 0);
        setCartCount(count);
    };

    const updateCartAmount = () => {
        const amount = cartItems.reduce((sum, item) => {
            const price = item.prices?.[0]?.discounted_price || 0;
            const qty = item.pivot?.quantity || 0;
            return sum + price * qty;
        }, 0);
        setCartAmount(amount);
    };

    useEffect(() => {
        updateCartCount();
        updateCartAmount();
    }, [cartItems]);

    const loadProducts = async () => {
        const result = await fetchProductData({ per_page: 5 });
        if (result) {
            setProducts(result.products);
        }
    };
    const loadFeaturedProducts = () => {
        return products.filter(p => p.is_feature === 1);
    };
    useEffect(() => {
        loadProducts();
        fetchCartProducts();
        fetchCategoriesData();
        fetchUserData();
    }, []);

    const value = {
        currency,
        router,
        userData,
        setUserData,
        fetchUserData,
        fetchProductData,
        products,
        categories,
        cartItems,
        setCartItems,
        cartObj,
        setCartObj,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        cartCount,
        cartAmount,
        cartLoading
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
