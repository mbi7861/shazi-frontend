'use client';

import { useRouter } from 'next/navigation';

export default function HomeProductsClient() {
    const router = useRouter();

    return (
        <button 
            onClick={() => router.push('/all-products')} 
            className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition"
        >
            See more
        </button>
    );
} 