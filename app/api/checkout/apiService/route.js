import { NextResponse } from 'next/server';
import axios from 'axios';
import { apiServiceConfig, getApiServiceUrl } from '@/app/config/apiService';

export async function POST(request) {
    try {
        const orderData = await request.json();
        
        // API Service endpoint for checkout
        const checkoutUrl = getApiServiceUrl(apiServiceConfig.endpoints.checkout);
        
        const response = await axios.post(checkoutUrl, orderData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            // Add any required authentication headers for your API Service
            'Authorization': `Bearer ${apiServiceConfig.apiToken || ''}`,
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

