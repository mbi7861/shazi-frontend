'use client';

import { useState } from 'react';
import CartModal from './CartModal';

export default function CartWrapper() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <>
            <button 
                onClick={() => setIsCartOpen(true)}
                className="relative"
            >
                {/* Cart icon or button content */}
            </button>
            <CartModal 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
            />
        </>
    );
} 