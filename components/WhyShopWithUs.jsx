'use client';

import { ShieldCheck, Truck, Star, HelpCircle } from 'lucide-react';

const features = [
    {
        icon: <Star className="w-10 h-10 text-orange-500" />,
        title: 'QUALITY AND SAVING',
        description: 'Comprehensive quality control and affordable prices',
    },
    {
        icon: <Truck className="w-10 h-10 text-orange-500" />,
        title: 'FAST SHIPPING',
        description: '24 Hours Order Confirmation and Shipping within 2 to 5 days',
    },
    {
        icon: <ShieldCheck className="w-10 h-10 text-orange-500" />,
        title: 'PAYMENT SECURITY',
        description: 'We prioritize the security and reliability of every transaction.',
    },
    {
        icon: <HelpCircle className="w-10 h-10 text-orange-500" />,
        title: 'HAVE QUESTIONS?',
        description: 'Customer Service – We’re here and happy to help!',
    },
];

export default function WhyShopWithUs() {
    return (
        <section id="whyShopWithUs">
            <h2 className="text-3xl font-bold text-center mb-10">Why Shop With Us?</h2>
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition"
                    >
                        <div className="mb-4 flex justify-center">{item.icon}</div>
                        <h3 className="font-bold mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
