'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import Navbar from "@/components/Navbar";
import { assets } from "@/assets/assets";
import Image from "next/image";
import PageHero from "@/components/PageHero";

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
        console.log("Submitted", data)
        // Simulate an API call
        await new Promise(res => setTimeout(res, 1000))
        setSubmitted(true)
        reset()
    }

    return (
        <>
            <Navbar />
            <PageHero title="Contact Us" />

            <div className="px-6 md:px-16 lg:px-32 py-24 flex flex-col md:flex-row justify-between">
                <form className="w-full max-w-xl">
                    <p className="text-2xl md:text-3xl ">
                        Contact <span className="font-semibold text-shazi-gold">Us</span>
                    </p>

                    <div className="space-y-4 mt-10">
                        {/* Full Name */}
                        <label className="block text-sm font-medium ">
                            Full Name
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Enter your name"
                                className="mt-1 px-3 py-2.5 border border-gray-400/40 rounded w-full text-gray-700 outline-none focus:border-primary transition"
                            />
                        </label>

                        {/* Email */}
                        <label className="block text-sm font-medium ">
                            Email Address
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Enter your email"
                                className="mt-1 px-3 py-2.5 border border-gray-400/40 rounded w-full text-gray-700 outline-none focus:border-primary transition"
                            />
                        </label>

                        {/* Subject */}
                        <label className="block text-sm font-medium ">
                            Subject
                            <input
                                type="text"
                                name="subject"
                                placeholder="Enter subject"
                                className="mt-1 px-3 py-2.5 border border-gray-400/40 rounded w-full text-gray-700 outline-none focus:border-primary transition"
                            />
                        </label>

                        {/* Message */}
                        <label className="block text-sm font-medium ">
                            Message
                            <textarea
                                name="message"
                                rows={5}
                                required
                                placeholder="Write your message here..."
                                className="mt-1 px-3 py-2.5 border border-gray-400/40 rounded w-full text-gray-700 outline-none resize-none focus:border-primary transition"
                            ></textarea>
                        </label>

                        <button
                            onSubmit={onSubmit}
                            className="w-full bg-shazi-gold text-white py-3 hover:bg-shazi-gold/80 transition uppercase"
                        >
                            Send Message
                        </button>
                    </div>
                </form>

                <Image
                    className="md:ml-16 mt-16 md:mt-0 w-[500px]"
                    src={assets.contact_us}
                    alt="contact_us_image"
                />
            </div>
        </>
    )
}
