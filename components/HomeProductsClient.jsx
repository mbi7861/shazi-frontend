'use client';

import Link from 'next/link';

export default function HomeProductsClient() {

    return (
        <Link 
            href="/all-products"
            className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition inline-block text-center cursor-pointer"
        >
            See more
        </Link>
    );
} 