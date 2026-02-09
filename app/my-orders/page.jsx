'use client';
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";

const MyOrders = () => {
    const { isAuthenticated } = useAuth();
    const { orders, isLoading } = useOrders();
    const currency = process.env.NEXT_PUBLIC_CURRENCY || "Rs";



    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
                <div className="space-y-5">
                    <h2 className="text-lg font-medium mt-6">My Orders</h2>
                    {!isAuthenticated ? (
                        <p className="text-sm text-gray-500">Please log in to view your orders.</p>
                    ) : isLoading ? (
                        <Loading />
                    ) : orders.length === 0 ? (
                        <p className="text-sm text-gray-500">You have no orders yet.</p>
                    ) : (
                        <div className=" border-t border-gray-300 text-sm">
                            {orders.map((order, index) => {
                                const items = order.order_items;
                                const address = order.address;
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
                                        key={order.id || order._id || index}
                                        className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300"
                                    >
                                        <div className="flex-1 flex gap-5 max-w-80">
                                            <Image
                                                className="max-w-16 max-h-16 object-cover"
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
                                        <div>
                                            <p className="flex flex-col">
                                                <span>Method : {order.payment_method || "COD"}</span>
                                                <span>
                                                    Date : {new Date(order.date || order.created_at).toLocaleDateString()}
                                                </span>
                                                <span>Payment : {order.payment_status || "Pending"}</span>
                                            </p>
                                        </div>
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