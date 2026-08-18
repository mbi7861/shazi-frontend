'use client';

import Link from "next/link";
import { useEffect } from "react";

// Deliberately self-contained (no Navbar/Footer/context usage) — this
// boundary needs to render even if the error originated inside one of
// the app's providers.
export default function ErrorBoundary({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
            <h1 className="text-3xl font-serif text-gray-800 mb-4">Something went wrong</h1>
            <p className="text-gray-500 mb-8 max-w-md">
                We hit an unexpected error. Please try again, or head back to the homepage.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => reset()}
                    className="px-6 py-3 bg-primary text-white hover:bg-primary/80 transition uppercase text-sm tracking-widest"
                >
                    Try Again
                </button>
                <Link
                    href="/"
                    className="px-6 py-3 bg-gray-200 text-gray-800 hover:bg-gray-300 transition uppercase text-sm tracking-widest"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
