/**
 * Order status display helpers — label text and badge styling for an
 * order's `status` field. Shared so my-orders and order-placed render
 * order status identically instead of maintaining their own copies.
 */

const STATUS_LABELS = {
    pending: "Pending",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
};

const STATUS_STYLES = {
    delivered: "bg-green-100 text-green-800",
    shipped: "bg-blue-100 text-blue-800",
    processing: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
};

export const getOrderStatusLabel = (status) => {
    return STATUS_LABELS[status?.toLowerCase()] || status || "N/A";
};

export const getOrderStatusStyles = (status) => {
    return STATUS_STYLES[status?.toLowerCase()] || "bg-gray-100 text-gray-800";
};
