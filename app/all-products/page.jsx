'use client'
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

const AllProducts = () => {
    const { fetchProductData } = useAppContext();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalProducts, setTotalProducts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const searchParams = useSearchParams();
    const search = searchParams.get('search') || '';

    // Filter state
    const [filters, setFilters] = useState({
        per_page: 16,
        search: search
    });

    // Price range state
    const [priceRange, setPriceRange] = useState({
        min: '',
        max: ''
    });

    // Debounced filter change handler
    const debouncedFilterChange = useCallback(
        (() => {
            let timeoutId;
            return (newFilters) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    handleFilterChange(newFilters);
                }, 500); // 500ms delay
            };
        })(),
        []
    );

    const loadProducts = async (filters = {}) => {
        try {
            setLoading(true);
            const result = await fetchProductData(filters);
            if (result) {
                setProducts(result.products);
                setCategories(result.categories);
                // Extract total count from pagination if available
                if (result.products?.data) {
                    setTotalProducts(result.products.total || 0);
                    setCurrentPage(result.products.current_page || 1);
                }
            }
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (newFilters) => {
        // Reset to first page when filters change
        const filtersWithPage = { ...newFilters, page: 1 };
        setCurrentPage(1);
        loadProducts(filtersWithPage);
    };

    // Handle search parameter changes
    useEffect(() => {
        const newFilters = { ...filters, search };
        setFilters(newFilters);
        if (search !== filters.search) {
            debouncedFilterChange(newFilters);
        }
    }, [search]);

    // Initial load
    useEffect(() => {
        loadProducts({ per_page: 15, search });
    }, []);

    // Handle pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
        const newFilters = { ...filters, page };
        loadProducts(newFilters);
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
                <div className="flex flex-col items-end pt-12 w-full">
                    <p className="text-2xl font-medium">All products</p>
                    <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
                </div>

                {/* Results Summary */}
                <div className="w-full mt-6 mb-4">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600">
                            {loading ? 'Loading...' : `${totalProducts} products found`}
                        </p>
                        {!loading && products.length > 0 && (
                            <p className="text-sm text-gray-500">
                                Page {currentPage} of {Math.ceil(totalProducts / (filters.per_page || 15))}
                            </p>
                        )}
                    </div>
                </div>

                {/* Main Content with Filters */}
                <div className="flex flex-col lg:flex-row gap-8 w-full">
                    {/* Filter Sidebar */}
                    <ProductFilters
                        filters={filters}
                        setFilters={setFilters}
                        categories={categories}
                        onFilterChange={debouncedFilterChange}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                    />

                    {/* Products Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                                {Array.from({ length: filters.per_page || 15 }).map((_, index) => (
                                    <div key={index} className="animate-pulse">
                                        <div className="bg-gray-200 rounded-lg w-full h-52 mb-2"></div>
                                        <div className="bg-gray-200 h-4 rounded mb-2"></div>
                                        <div className="bg-gray-200 h-3 rounded mb-2"></div>
                                        <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                                    </div>
                                ))}
                            </div>
                        ) : products.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                                    {products.map((product, index) => (
                                        <ProductCard key={product.id || index} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalProducts > (filters.per_page || 15) && (
                                    <div className="flex items-center justify-center gap-2 mt-12 mb-8">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                        >
                                            Previous
                                        </button>
                                        
                                        {Array.from({ length: Math.min(5, Math.ceil(totalProducts / (filters.per_page || 15))) }).map((_, index) => {
                                            const page = index + 1;
                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    className={`px-3 py-2 border rounded-md ${
                                                        currentPage === page
                                                            ? 'bg-orange-600 text-white border-orange-600'
                                                            : 'border-gray-300 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            );
                                        })}
                                        
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage >= Math.ceil(totalProducts / (filters.per_page || 15))}
                                            className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                                <button
                                    onClick={() => {
                                        setFilters({ per_page: 15 });
                                        setPriceRange({ min: '', max: '' });
                                        loadProducts({ per_page: 15 });
                                    }}
                                    className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;
