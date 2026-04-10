"use client";
import Navbar from "../Navbar";
import PageHero from "../PageHero";

export default function CheckoutSkeleton() {
  return (
    <>
      <Navbar />
      <PageHero title="Checkout" />

      <div className="flex flex-col min-h-screen">
        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="flex flex-col-reverse lg:flex-row gap-8">
            {/* Form Section - 70% */}
            <div className="lg:w-3/5">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
              <div className="space-y-4">
                <div className="h-52 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Summary Section - 30% */}
            <div className="lg:w-2/5">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}

