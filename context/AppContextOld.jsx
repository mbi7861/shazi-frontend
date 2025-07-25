'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/app/api/axiosInstance";
import '../app/utils/utils';

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const BASE_URL = process.env.BASE_URL || 'http://localhost/infinite-cart/public/api';

export const AppContextProvider = (props) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY;
    const router = useRouter();

    const [userData, setUserData] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartAmount, setCartAmount] = useState(0);
    const [cartCount, setCartCount] = useState(0);

     const fetchProductData = async (filters = {}) => {
        const params = new URLSearchParams(filters).toString();

        try {
            const { data } = await axios.get(`${BASE_URL}/products?${params}`);

            if (data.status) {
                return {
                    products: data.data.products,
                    categories: data.categories
                };
            } else {
                toast.error(data.message || 'Failed to load products');
                return null;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            return null;
        }
    };


    const fetchUserData = async () => {
        try {
            const { data } = await axiosInstance.get('/get-user');

            if (data.status) {
                setUserData(data.data.user);
                setCartItems(data.data.cartItems.toDict('id'));
                setCartCount(data.data.totalCount);
                setCartAmount(data.data.total);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const addToCart = async (itemId) => {
        try {
            const { data } = await axiosInstance.post(`${BASE_URL}/cart/${itemId}`);

            if (!data.status) {
                return toast.error(data.msg || 'Failed to add to cart');
            }

            setCartItems(prevCart => {
                const updatedCart = { ...prevCart };

                    const product = data.data.product;
                    updatedCart[product.id] = product;
                    if (!updatedCart[product.id].pivot){
                        updatedCart[product.id].pivot = {};
                    }
                    updatedCart[product.id].pivot.quantity = data.data.quantity;

                return updatedCart;
            });

            toast.success('Item added to cart');
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };


    const removeFromCart = async (itemId) => {
        if (!userData) {
            return toast('Please login', { icon: '⚠️' });
        }

        try {
            await axiosInstance.delete(`${BASE_URL}/cart/${itemId}`);

            setCartItems(prevCart => {
                const updatedCart = { ...prevCart };
                delete updatedCart[itemId];
                return updatedCart;
            });

            toast.success('Item removed from cart');
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };


        const updateCartQuantity = async (itemId, quantity) => {
            try {
                const currentQuantity = cartItems[itemId]?.pivot?.quantity || 0;
                const action = quantity > currentQuantity ? 'increase' : 'decrease';

                const { data } = await axiosInstance.patch(`${BASE_URL}/cart/${itemId}/${action}`, {qty:quantity });
                if (data.status){
                    setCartItems(prevCart => {
                        const updatedCart = { ...prevCart };

                        if (data.data.removed) {
                            delete updatedCart[data.data.product_id];
                        } else {
                            const updatedProduct = data.data.product;
                            updatedCart[updatedProduct.id] = updatedProduct;
                        }

                        return updatedCart;
                    });
                    toast.success('Cart updated');
                }else {
                    toast.error(data.msg);
                }

            } catch (error) {
                toast.error(error.response?.data?.message || error.message);
            }
        };

    const updateCartCount = () => {
        const count = Object.values(cartItems).reduce(
            (total, item) => total + (item.pivot?.quantity || 0),
            0
        );
        setCartCount(count);
    };

    const updateCartAmount = () => {
        const amount = Object.values(cartItems).reduce((total, item) => {
            const price = item.prices?.[0]?.discounted_price || 0;
            const quantity = item.pivot?.quantity || 0;
            return total + price * quantity;
        }, 0);
        setCartAmount(amount);
    };

// Run updates when cartItems change
    useEffect(() => {
        updateCartCount();
        updateCartAmount();
    }, [cartItems]);

    const loadProducts = async () => {
        const result = await fetchProductData({ per_page: 5 });
        if (result) {
            setProducts(result.products);
            setCategories(result.categories);
        }
    };


    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        fetchUserData();
    }, []);

    const value = {
        currency,
        router,
        userData,
        fetchUserData,
        fetchProductData,
        products,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        cartCount,
        cartAmount
    };

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
