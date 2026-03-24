import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy - Shazi Jewels",
  description: "Privacy Policy for Shazi Jewels - Your safety is our best priority",
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Introduction</h2>
              <p className="mb-4">
                Welcome to Shazi Jewels. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and make purchases from us.
              </p>
              <p>
                Your safety is our best priority, and this extends to how we handle your personal data. By using our website, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 text-gray-900">Personal Information</h3>
                  <p>We may collect the following personal information:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Name and contact information (email address, phone number)</li>
                    <li>Shipping and billing addresses</li>
                    <li>Payment information (processed securely through third-party payment processors)</li>
                    <li>Account credentials if you create an account</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2 text-gray-900">Usage Information</h3>
                  <p>We automatically collect certain information when you visit our website:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>IP address and browser type</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Device information</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. How We Use Your Information</h2>
              <p className="mb-4">We use the collected information for various purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To process and fulfill your orders for breakers, lights, heaters, and other electrical supplies</li>
                <li>To communicate with you about your orders, products, and services</li>
                <li>To improve our website and customer experience</li>
                <li>To send you promotional materials and updates (with your consent)</li>
                <li>To detect and prevent fraud and ensure security</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Information Sharing and Disclosure</h2>
              <p className="mb-4">We do not sell your personal information. We may share your information only in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Providers:</strong> We may share information with third-party service providers who assist us in operating our website, processing payments, and delivering products</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale, your information may be transferred</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Data Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
              <p>
                Your safety is our best priority, and we continuously work to improve our security practices to keep your data safe.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate or incomplete information</li>
                <li>Request deletion of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Cookies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">10. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">11. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
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

