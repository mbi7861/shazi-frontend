import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Page Not Found",
    robots: { index: false, follow: false },
};

export default function NotFound() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
                <h1 className="text-6xl font-serif text-gray-800 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-2">Page not found</p>
                <p className="text-gray-500 mb-8 max-w-md">
                    The page you're looking for doesn't exist or may have been moved.
                </p>
                <Link
                    href="/"
                    className="px-6 py-3 bg-primary text-white hover:bg-primary/80 transition uppercase text-sm tracking-widest"
                >
                    Back to Home
                </Link>
            </div>
            <Footer />
        </>
    );
}
