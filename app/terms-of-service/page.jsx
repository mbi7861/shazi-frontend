import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Terms of Service - Shazi Jewels",
  description: "Terms of Service for Shazi Jewels",
};

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <PageHero title="Terms of Service" />
      <div className="px-6 md:px-16 lg:px-32 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Terms of <span className="text-primary">Service</span>
          </h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Introduction</h2>
              <p>
                Welcome to Shazi Jewels. These Terms of Service ("Terms") govern your access to and
                use of our website and the purchase of products from us. By using our website or
                placing an order, you agree to be bound by these Terms. If you do not agree, please
                do not use our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Orders and Payment</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All orders are subject to acceptance and availability.</li>
                <li>Prices are listed in the currency shown at checkout and may change without notice.</li>
                <li>Payment is required at the time of order via the payment methods offered at checkout.</li>
                <li>We reserve the right to cancel or refuse any order for any reason, including suspected fraud or pricing errors.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Shipping and Delivery</h2>
              <p>
                Estimated delivery times are provided at checkout and are not guaranteed. Shazi Jewels
                is not responsible for delays caused by the shipping carrier or events outside our
                control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Returns and Refunds</h2>
              <p>
                If you're not satisfied with your purchase, please contact us so we can help. Any
                applicable return or refund is handled on a case-by-case basis in accordance with
                our customer service policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Product Descriptions</h2>
              <p>
                We attempt to be as accurate as possible in describing our products. We do not
                warrant that product descriptions, images, or other content are error-free.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Account Responsibility</h2>
              <p>
                If you create an account with us, you are responsible for maintaining the
                confidentiality of your account credentials and for all activity that occurs under
                your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Intellectual Property</h2>
              <p>
                All content on this website — including text, graphics, logos, and images — is the
                property of Shazi Jewels or its licensors and is protected by applicable
                intellectual property laws. You may not reproduce or use it without our permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Shazi Jewels shall not be liable for any
                indirect, incidental, or consequential damages arising from your use of our website
                or products.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. Changes to These Terms</h2>
              <p>
                We may update these Terms from time to time. Continued use of our website after
                changes are posted constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">10. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">Shazi Jewels</p>
                <p>Email: info@shazijewels.com</p>
                <p>Website: www.shazijewels.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
