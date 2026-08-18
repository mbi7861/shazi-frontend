'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import Navbar from "@/components/Navbar";
import { assets } from "@/assets/assets";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer"
import { contactService } from "@/services";
import toast from "react-hot-toast";

const contactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(10, "Message must be at least 10 characters"),
})


export default function ContactForm() {
    const [submitted, setSubmitted] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(contactSchema),
    })

    const onSubmit = async (data) => {
        const result = await contactService.submitContact(data);
        if (!result.success) {
            toast.error(result.message || "Failed to send message");
            return;
        }
        toast.success(result.message || "Message sent successfully");
        reset();
    }

    return (
        <>
            <Navbar />
            <PageHero title="Contact Us" />
            <div className="px-6 md:px-16 lg:px-32 py-24 flex flex-col md:flex-row justify-between">
                <form className="w-full max-w-xl" onSubmit={handleSubmit(onSubmit)}>
                    <p className="text-2xl md:text-3xl text-gray-500">
                        Contact <span className="font-semibold text-primary">Us</span>
                    </p>

                    <div className="space-y-4 mt-10">
                        {/* Full Name */}
                        <label className="block text-sm font-medium text-gray-600">
                            Full Name
                            <input
                                type="text"
                                {...register("name")}
                                placeholder="Enter your name"
                                className="mt-1 px-3 py-2.5 border border-gray-400/40 rounded w-full text-gray-700 outline-none focus:border-primary transition"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </label>

                        {/* Email */}
                        <label className="block text-sm font-medium text-gray-600">
                            Email Address
                            <input
                                type="email"
                                {...register("email")}
                                placeholder="Enter your email"
                                className="mt-1 px-3 py-2.5 border border-gray-400/40 rounded w-full text-gray-700 outline-none focus:border-primary transition"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </label>

                        {/* Subject */}
                        <label className="block text-sm font-medium text-gray-600">
                            Subject
                            <input
                                type="text"
                                {...register("subject")}
                                placeholder="Enter subject"
                                className="mt-1 px-3 py-2.5 border border-gray-400/40 rounded w-full text-gray-700 outline-none focus:border-primary transition"
                            />
                            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                        </label>

                        {/* Message */}
                        <label className="block text-sm font-medium text-gray-600">
                            Message
                            <textarea
                                {...register("message")}
                                rows={5}
                                placeholder="Write your message here..."
                                className="mt-1 px-3 py-2.5 border border-gray-400/40 rounded w-full text-gray-700 outline-none resize-none focus:border-primary transition"
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                        </label>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary text-white py-3 hover:bg-primary/80 transition uppercase disabled:opacity-60"
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                    </div>
                </form>

                <Image
                    className="md:ml-16 mt-16 md:mt-0 w-[500px]"
                    src={assets.contact_us}
                    alt="contact_us_image"
                />
            </div>
            <Footer />
        </>
    )
}
