'use client';
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useOrders } from "@/context/OrderContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";

const getOrderStatusLabel = (status) => {
    const statuses = {
        pending: "Pending",
        processing: "Processing",
        shipped: "Shipped",
        delivered: "Delivered",
        cancelled: "Cancelled",
    };
    return statuses[status?.toLowerCase()] || status || "N/A";
};

const getOrderStatusStyles = (status) => {
    const s = status?.toLowerCase();
    if (s === "delivered") return "bg-green-100 text-green-800";
    if (s === "shipped") return "bg-blue-100 text-blue-800";
    if (s === "processing") return "bg-yellow-100 text-yellow-800";
    if (s === "cancelled") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
};

const MyOrders = () => {
    const { orders, isLoading } = useOrders();
    const currency = process.env.NEXT_PUBLIC_CURRENCY || "Rs";
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
                <div className="space-y-5">
                    <h2 className="text-lg font-medium mt-6">My Orders</h2>
                    {isLoading ? (
                        <Loading />
                    ) : orders.length === 0 ? (
                        <p className="text-sm text-gray-500">You have no orders yet.</p>
                    ) : (
                        <div className="border-t border-gray-300 text-sm">
                            {orders.map((order, index) => {
                                const items = order.order_items || [];
                                const address = order.address;
                                const orderId = order.id || order._id || index;
                                const isExpanded = expandedOrderId === orderId;
                                const itemLabel = items
                                    .map(
                                        (item) =>
                                            `${item.title || item.product?.title || item.product?.name || item.product_name || "Item"} x ${item.quantity || 1}`
                                    )
                                    .join(", ");
                                const orderTotal = order.total ?? order.amount ?? 0;
                                const orderCurrency =
                                    items.find((item) => item.price?.currency)?.price?.currency ||
                                    currency;

                                return (
                                    <div
                                        key={orderId}
                                        className="border-b border-gray-300"
                                    >
                                        {/* Summary row - clickable */}
                                        <div
                                            onClick={() => setExpandedOrderId(isExpanded ? null : orderId)}
                                            className="flex flex-col md:flex-row gap-5 justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex-1 flex gap-5 max-w-80">
                                                <Image
                                                    className="max-w-16 max-h-16 object-cover flex-shrink-0"
                                                    src={assets.box_icon}
                                                    alt="box_icon"
                                                />
                                                <p className="flex flex-col gap-3">
                                                    <span className="font-medium text-base">{itemLabel}</span>
                                                    <span>Items : {items.length}</span>
                                                </p>
                                            </div>
                                            <div>
                                                {address ? (
                                                    <p>
                                                        <span className="font-medium">
                                                            {address.fullName ||
                                                                `${address.first_name || ""} ${address.last_name || ""}`.trim()}
                                                        </span>
                                                        <br />
                                                        <span>{address.area || address.address || ""}</span>
                                                        <br />
                                                        <span>
                                                            {address.city
                                                                ? `${address.city}${address.state ? `, ${address.state}` : ""}`
                                                                : ""}
                                                        </span>
                                                        <br />
                                                        <span>{address.phoneNumber || address.phone || ""}</span>
                                                    </p>
                                                ) : (
                                                    <p>
                                                        <span className="font-medium">{order.email || "No address"}</span>
                                                    </p>
                                                )}
                                            </div>
                                            <p className="font-medium my-auto">
                                                {orderCurrency} {Number(orderTotal || 0).toFixed(2)}
                                            </p>
                                            <div className="flex items-center gap-3">
                                                <p className="flex flex-col">
                                                    <span>Method : {order.payment_method || "COD"}</span>
                                                    <span>
                                                        Date : {new Date(order.date || order.created_at).toLocaleDateString()}
                                                    </span>
                                                    <span>Payment : {order.payment_status || "Pending"}</span>
                                                </p>
                                                <button
                                                    className={`p-1 rounded transition-transform ${isExpanded ? "rotate-180" : ""}`}
                                                    aria-label={isExpanded ? "Collapse" : "Expand"}
                                                >
                                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Expanded details */}
                                        {isExpanded && (
                                            <div className="px-5 pb-5 pt-0 border-t border-gray-200 bg-gray-50/50">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                                    {/* Order status & meta */}
                                                    <div className="space-y-3">
                                                        <h4 className="font-semibold text-gray-800">Order Info</h4>
                                                        <div className="space-y-1.5">
                                                            {(order.id || order._id) && (
                                                                <p><span className="text-gray-500">Order ID:</span> #{order.id || order._id}</p>
                                                            )}
                                                            <p>
                                                                <span className="text-gray-500">Status:</span>{" "}
                                                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getOrderStatusStyles(order.status)}`}>
                                                                    {getOrderStatusLabel(order.status)}
                                                                </span>
                                                            </p>
                                                            <p><span className="text-gray-500">Date:</span> {new Date(order.date || order.created_at).toLocaleString()}</p>
                                                            <p><span className="text-gray-500">Payment:</span> {order.payment_method || "COD"} · {order.payment_status || "Pending"}</p>
                                                        </div>
                                                    </div>

                                                    {/* Shipping address */}
                                                    <div className="space-y-3">
                                                        <h4 className="font-semibold text-gray-800">Shipping Address</h4>
                                                        {address ? (
                                                            <p className="text-gray-600">
                                                                {address.fullName || `${address.first_name || ""} ${address.last_name || ""}`.trim()}<br />
                                                                {address.area || address.address || ""}<br />
                                                                {address.city ? `${address.city}${address.state ? `, ${address.state}` : ""}` : ""}<br />
                                                                {address.phoneNumber || address.phone || ""}
                                                            </p>
                                                        ) : (
                                                            <p className="text-gray-500">{order.email || "No address"}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Order items detail */}
                                                <div className="mt-6">
                                                    <h4 className="font-semibold text-gray-800 mb-3">Items</h4>
                                                    <div className="space-y-4">
                                                        {items.map((item, i) => {
                                                            const title = item.title || item.product?.title || item.product?.name || item.product_name || "Item";
                                                            const qty = item.quantity || 1;
                                                            const priceData = item.price;
                                                            const unitPrice = priceData?.discounted_price ?? priceData?.original_price ?? item.price ?? 0;
                                                            const itemCurrency = priceData?.currency || currency;
                                                            const itemTotal = Number(unitPrice) * qty;
                                                            const hasVariants = item.variation_options && item.variation_options.length > 0;

                                                            return (
                                                                <div
                                                                    key={item.id || i}
                                                                    className="flex justify-between items-start py-3 px-4 bg-white rounded border border-gray-200"
                                                                >
                                                                    <div className="flex-1">
                                                                        <p className="font-medium text-gray-800">{title}</p>
                                                                        {item.sku && (
                                                                            <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                                                                        )}
                                                                        {hasVariants && (
                                                                            <p className="text-xs text-gray-600 mt-1">
                                                                                {item.variation_options.map((opt) => opt.value).join(" · ")}
                                                                            </p>
                                                                        )}
                                                                        <p className="text-sm text-gray-500 mt-0.5">Qty: {qty}</p>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="text-sm text-gray-600">
                                                                            {itemCurrency} {Number(unitPrice).toFixed(2)} × {qty}
                                                                        </p>
                                                                        <p className="font-semibold text-gray-800">
                                                                            {itemCurrency} {Number(itemTotal).toFixed(2)}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                {/* Order summary totals */}
                                                {(order.subtotal != null || order.discount_total != null || order.shipping_cost != null) && (
                                                    <div className="mt-6 pt-4 border-t border-gray-200">
                                                        <h4 className="font-semibold text-gray-800 mb-2">Summary</h4>
                                                        <div className="space-y-1 text-sm">
                                                            {order.subtotal != null && (
                                                                <div className="flex justify-between"><span>Subtotal</span><span>{currency} {Number(order.subtotal).toFixed(2)}</span></div>
                                                            )}
                                                            {order.discount_total > 0 && (
                                                                <div className="flex justify-between text-green-600"><span>Discount</span><span>-{currency} {Number(order.discount_total).toFixed(2)}</span></div>
                                                            )}
                                                            {order.total_tax > 0 && (
                                                                <div className="flex justify-between"><span>Tax</span><span>{currency} {Number(order.total_tax).toFixed(2)}</span></div>
                                                            )}
                                                            {order.shipping_cost != null && (
                                                                <div className="flex justify-between"><span>Shipping</span><span>{currency} {Number(order.shipping_cost).toFixed(2)}</span></div>
                                                            )}
                                                            <div className="flex justify-between font-semibold pt-2 mt-2 border-t border-gray-200">
                                                                <span>Total</span><span>{orderCurrency} {Number(orderTotal || 0).toFixed(2)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;