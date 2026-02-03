'use client'
import { assets } from '@/assets/assets'
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

const OrderPlaced = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get order data from URL params or localStorage
    const orderId = searchParams.get('order_id');
    const orderDataParam = searchParams.get('order_data');
    
    if (orderDataParam) {
      // If order data is in URL params (for backwards compatibility)
      try {
        const parsedData = JSON.parse(decodeURIComponent(orderDataParam));
        setOrderData(parsedData);
        setLoading(false);
        return;
      } catch (error) {
        console.error('Error parsing order data from URL:', error);
      }
    }
    
    if (orderId) {
      // First try to get full order data from localStorage
      const storedOrderData = localStorage.getItem(`order_data_${orderId}`);
      if (storedOrderData) {
        try {
          const parsedData = JSON.parse(storedOrderData);
          // Remove stored_at timestamp if present
          const { stored_at, ...orderData } = parsedData;
          setOrderData(orderData);
          setLoading(false);
          return;
        } catch (error) {
          console.error('Error parsing stored order data:', error);
        }
      }
      
      // Fallback to order_${orderId} format
      const storedOrder = localStorage.getItem(`order_${orderId}`);
      if (storedOrder) {
        try {
          const parsedData = JSON.parse(storedOrder);
          setOrderData(parsedData);
          setLoading(false);
          return;
        } catch (error) {
          console.error('Error parsing stored order:', error);
        }
      }
      
      setLoading(false);
      return;
    }
    
    // Try to get the most recent order data from localStorage
    const keys = Object.keys(localStorage);
    const orderDataKeys = keys.filter(key => key.startsWith('order_data_'));
    if (orderDataKeys.length > 0) {
      // Get the most recent order data
      const latestKey = orderDataKeys.sort().reverse()[0];
      const storedOrder = localStorage.getItem(latestKey);
      if (storedOrder) {
        try {
          const parsedData = JSON.parse(storedOrder);
          const { stored_at, ...orderData } = parsedData;
          setOrderData(orderData);
          setLoading(false);
          return;
        } catch (error) {
          console.error('Error parsing stored order:', error);
        }
      }
    }
    
    // Fallback to order_ keys
    const orderKeys = keys.filter(key => key.startsWith('order_') && !key.startsWith('order_data_'));
    if (orderKeys.length > 0) {
      const latestKey = orderKeys.sort().reverse()[0];
      const storedOrder = localStorage.getItem(latestKey);
      if (storedOrder) {
        try {
          const parsedData = JSON.parse(storedOrder);
          setOrderData(parsedData);
          setLoading(false);
          return;
        } catch (error) {
          console.error('Error parsing stored order:', error);
        }
      }
    }
    
    setLoading(false);
  }, [searchParams]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount, currency = 'Rs') => {
    return `${currency} ${parseFloat(amount || 0).toFixed(2)}`;
  };

  const getPaymentMethodLabel = (method) => {
    const methods = {
      'cod': 'Cash on Delivery',
      'card': 'Credit/Debit Card',
      'bank_transfer': 'Bank Transfer'
    };
    return methods[method] || method?.toUpperCase() || 'N/A';
  };

  const getPaymentStatusLabel = (status) => {
    const statuses = {
      'pending': 'Pending',
      'completed': 'Completed',
      'failed': 'Failed',
      'pending_delivery': 'Pending Delivery'
    };
    return statuses[status] || status || 'N/A';
  };

  const getOrderStatusLabel = (status) => {
    const statuses = {
      'pending': 'Pending',
      'processing': 'Processing',
      'shipped': 'Shipped',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled'
    };
    return statuses[status] || status || 'N/A';
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-orange-600 border-gray-200"></div>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-5 p-4">
          <div className="text-center text-xl font-semibold text-gray-700">Order information not found</div>
          <Link 
            href="/my-orders" 
            className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
          >
            View My Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center relative mb-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600">Thank you for your order. We've received your order and will begin processing it right away.</p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Order ID</p>
              <p className="text-lg font-semibold text-gray-800">#{orderData.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
              <p className="text-lg font-semibold text-gray-800">{orderData.transaction_id || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="text-lg text-gray-800">{orderData.email || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Order Date</p>
              <p className="text-lg text-gray-800">{formatDate(orderData.created_at)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Payment Method</p>
              <p className="text-lg text-gray-800">{getPaymentMethodLabel(orderData.payment_method)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Payment Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                orderData.payment_status === 'completed' ? 'bg-green-100 text-green-800' :
                orderData.payment_status === 'pending' || orderData.payment_status === 'pending_delivery' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {getPaymentStatusLabel(orderData.payment_status)}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Shipping Method</p>
              <p className="text-lg text-gray-800 capitalize">{orderData.shipping_method || 'Standard'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Order Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                orderData.status === 'delivered' ? 'bg-green-100 text-green-800' :
                orderData.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                orderData.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                orderData.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {getOrderStatusLabel(orderData.status)}
              </span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        {orderData.order_items && orderData.order_items.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Order Items</h2>
            </div>
            
            <div className="space-y-4">
              {orderData.order_items.map((item, index) => (
                <div key={item.id || index} className="flex justify-between items-start py-4 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
                    <p className="font-medium text-gray-800">SKU: {item.sku}</p>
                    <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                    {item.price && (
                      <p className="text-sm text-gray-600 mt-1">
                        Price: {formatCurrency(item.price.discounted_price, item.price.currency)}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    {item.price && (
                      <p className="font-semibold text-gray-800">
                        {formatCurrency(
                          item.price.discounted_price * item.quantity,
                          item.price.currency
                        )}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(orderData.subtotal)}</span>
            </div>
            {orderData.discount_total > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Discount</span>
                <span className="text-green-600">-{formatCurrency(orderData.discount_total)}</span>
              </div>
            )}
            {orderData.total_tax > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>{formatCurrency(orderData.total_tax)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600">
              <span>Shipping Cost</span>
              <span>{formatCurrency(orderData.shipping_cost)}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between text-xl font-bold text-gray-800">
                <span>Total</span>
                <span>{formatCurrency(orderData.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/my-orders"
            className="px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition text-center font-medium"
          >
            View All Orders
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition text-center font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderPlaced