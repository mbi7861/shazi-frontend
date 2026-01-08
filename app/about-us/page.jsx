import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us - Dilawar Traders",
  description: "Learn about Dilawar Traders - Your trusted source for quality electrical and home supplies. Your safety is our best priority.",
};

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-orange-600">Us</span>
          </h1>
          <p className="text-2xl text-gray-600 mb-8 font-medium">
            Your safety is our best priority
          </p>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Who We Are</h2>
              <p className="mb-4">
                Dilawar Traders is a trusted name in the electrical and home supplies industry. We specialize in providing high-quality breakers, lights, heaters, and other essential electronics for residential and commercial use. With years of experience in the market, we have built a reputation for reliability, safety, and customer satisfaction.
              </p>
              <p>
                Our commitment to quality and safety sets us apart. Every product we offer is carefully selected to meet the highest standards, ensuring that your home and workplace are equipped with reliable and safe electrical components.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Mission</h2>
              <p className="mb-4">
                At Dilawar Traders, our mission is simple yet powerful: <strong>Your safety is our best priority.</strong> We believe that every home and business deserves access to quality electrical supplies that are not only reliable but also safe.
              </p>
              <p>
                We are dedicated to providing our customers with products that meet stringent safety standards, backed by excellent customer service and support. We understand that electrical safety is paramount, and we take this responsibility seriously.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">What We Offer</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 text-gray-900">Circuit Breakers</h3>
                  <p>
                    High-quality circuit breakers designed to protect your electrical systems from overloads and short circuits. Our breakers are tested and certified to ensure maximum safety and reliability.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2 text-gray-900">Lighting Solutions</h3>
                  <p>
                    A wide range of lighting products including LED lights, fixtures, and accessories. Energy-efficient and long-lasting solutions to brighten your spaces while reducing energy consumption.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2 text-gray-900">Heaters</h3>
                  <p>
                    Safe and efficient heating solutions for your home and office. Our heaters are designed with safety features to provide warmth and comfort without compromising on safety standards.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2 text-gray-900">Other Home Electronics</h3>
                  <p>
                    We also offer a variety of other essential home electronics and electrical supplies to meet all your needs.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Why Choose Us</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 text-gray-900">Quality Assurance</h3>
                  <p>
                    Every product in our inventory undergoes rigorous quality checks. We partner with reputable manufacturers and suppliers to ensure that only the best products reach our customers.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2 text-gray-900">Safety First</h3>
                  <p>
                    Safety is at the core of everything we do. All our products comply with industry safety standards and regulations. We believe that your safety is our best priority, and this principle guides every decision we make.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2 text-gray-900">Customer Service</h3>
                  <p>
                    We are committed to providing exceptional customer service. Our team is always ready to assist you with product selection, technical questions, and after-sales support. Your satisfaction is important to us.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2 text-gray-900">Competitive Pricing</h3>
                  <p>
                    We offer competitive prices without compromising on quality. We believe that everyone should have access to safe and reliable electrical supplies at affordable prices.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Commitment</h2>
              <p className="mb-4">
                At Dilawar Traders, we are committed to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Providing only high-quality, safety-certified products</li>
                <li>Maintaining transparent and honest business practices</li>
                <li>Ensuring customer satisfaction through excellent service</li>
                <li>Continuously improving our product range and services</li>
                <li>Upholding the highest standards of electrical safety</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact Us</h2>
              <p className="mb-4">
                We'd love to hear from you! Whether you have questions about our products, need assistance with your order, or want to learn more about what we offer, our team is here to help.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium mb-2">Get in Touch</p>
                <p>Email: info@dilawartraders.com</p>
                <p>Website: www.dilawartraders.com</p>
                <p className="mt-4 text-sm text-gray-600">
                  Visit our <a href="/contact-us" className="text-orange-600 hover:underline">Contact Us</a> page to send us a message.
                </p>
              </div>
            </section>

            <section className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-600">
              <p className="text-lg font-semibold text-gray-900 mb-2">
                Remember: Your safety is our best priority.
              </p>
              <p className="text-gray-700">
                Thank you for choosing Dilawar Traders. We look forward to serving you and helping you create a safer, more efficient electrical environment for your home or business.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

