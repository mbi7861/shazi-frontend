import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
    try {
        const orderData = await request.json();
        
        // API Service endpoint for checkout
        const apiServiceUrl = process.env.API_SERVICE_URL || 'http://localhost/infinite-cart/public/api';
        
        const response = await axios.post(`${apiServiceUrl}/checkout`, orderData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            // Add any required authentication headers for your API Service
            'Authorization': `Bearer ${process.env.API_SERVICE_TOKEN || ''}`,
        });
        
        return NextResponse.json({
            success: true,
            data: response.data
        });
        
    } catch (error) {
        console.error('API Service Error:', error.response?.data || error.message);
        
        return NextResponse.json({
            success: false,
            error: error.response?.data?.message || error.message
        }, { status: 500 });
    }
}

