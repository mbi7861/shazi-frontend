# API Service Integration for Infinite Cart Frontend

This document explains how to integrate your API Service backend with the Next.js frontend for the checkout process.

## Overview

The frontend is designed to work with a RESTful API service that handles order processing, user management, and other e-commerce functionality.

## Configuration

### 1. Environment Variables

Set the following environment variables in your `.env.local` file:

```bash
NEXT_PUBLIC_API_SERVICE_URL=http://localhost/infinite-cart/public/api
API_SERVICE_TOKEN=your_api_service_token_here
```

### 2. API Service Endpoints Required

Your API service backend should have the following API endpoints:

- `POST /checkout` - Process checkout and create orders
- `GET /orders` - Retrieve user orders
- `POST /discount/apply` - Apply discount codes
- `GET /shipping/methods` - Get available shipping methods
- `POST /address/validate` - Validate shipping addresses

## Integration Details

### Authentication

The integration supports Bearer token authentication. Set your API service token in the `API_SERVICE_TOKEN` environment variable, or implement user-specific authentication by storing the token in cookies with the key `AUTH-TOKEN`.

### Request Format

The frontend sends order data in the following format:

```json
{
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "shipping": {
    "address": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "zipCode": "12345",
    "country": "USA"
  },
  "items": [
    {
      "productId": "123",
      "quantity": 2,
      "price": 29.99
    }
  ],
  "payment": {
    "method": "stripe",
    "token": "tok_..."
  }
}
```

### Response Format

Expected response format:

```json
{
  "success": true,
  "data": {
    "order_id": "ORD-12345",
    "status": "pending",
    "total": 59.98
  }
}
```

## Features

- ✅ Checkout form submission to API Service
- ✅ Order creation and management
- ✅ Discount code application
- ✅ Address validation (if implemented in API service)
- ✅ Error handling and user feedback
- ✅ Responsive design for mobile and desktop

## Data Mapping

The frontend automatically maps form data to match API service expectations:

| Frontend Field | API Service Field |
|----------------|-------------------|
| `formData.name` | `customer.name` |
| `formData.email` | `customer.email` |
| `formData.phone` | `customer.phone` |
| `formData.address` | `shipping.address` |
| `formData.city` | `shipping.city` |
| `formData.state` | `shipping.state` |
| `formData.zipCode` | `shipping.zipCode` |
| `formData.country` | `shipping.country` |

## Setup Instructions

### 1. Start your API service backend

Ensure your backend is running and accessible at the configured URL.

### 2. Configure environment variables

Set the required environment variables in your `.env.local` file.

### 3. Test the integration

Try creating a test order to verify the connection is working.

## Troubleshooting

Common issues and solutions:

1. **CORS Errors**: Ensure your API service backend allows requests from your Next.js frontend domain
2. **Authentication Errors**: Verify your API service token is correct and has the required permissions
3. **Network Errors**: Check that your API service URL is correct and accessible
4. **Data Format Errors**: Ensure the request body matches the expected API service format

## File Structure

```
app/
├── api/
│   └── checkout/
│       └── apiService/
│           └── route.js          # Next.js API route for API service integration
├── config/
│   └── apiService.js               # API service configuration
├── utils/
│   └── apiService.js            # API service utilities
└── checkout/
    └── page.jsx                 # Updated checkout page with API service integration
```

## Support

For issues or questions about the API service integration, check:

1. Browser console for client-side errors
2. Next.js API route logs for server-side errors
3. API service backend logs for server-side errors
4. Network tab in browser dev tools for request/response details

