'use client';

import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axiosInstance from '@/app/api/axiosInstance';
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import GoogleAuth from "@/components/GoogleAuth";
import Cookies from "js-cookie";

const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string().min(10, 'Phone is required'),
    gender: z.enum(['male', 'female']),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

export default function AuthModal({ isOpen, onClose }) {
    const [isLogin, setIsLogin] = useState(true);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const { fetchUserData } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    });

    const onSubmit = async (data) => {
        try {
            const url = isLogin ? 'auth/login' : 'auth/register';

            const response = await axiosInstance.post(url, data);

            if (response?.data?.status) {
                const token = response.data.data.session.session_token;
                Cookies.setItem('AUTH-TOKEN', token);
                await fetchUserData(); // Refresh user data from context
                toast.success(response.data.msg || (isLogin ? 'Login successful!' : 'Registration successful!'));
                onClose();
            } else {
                toast.error(response.data.msg || 'Authentication failed.');
            }
        } catch (error) {
            if (error.response?.data?.msg) {
                toast.error(error.response.data.msg);
            } else if (error.message) {
                toast.error(error.message);
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        }
    };

    const loginWithGoogle = async ({ code, status }) => {
        console.log(code,status);
        if (!code || status === false) {
            setIsGoogleLoading(false);
            toast.error('Google authentication failed.');
            return;
        }
        try {
            setIsGoogleLoading(true);
            const endpoint = isLogin
                ? 'auth/social-login/google'
                : 'auth/social-register/google';
            const response = await axiosInstance.post(endpoint, { code });

            if (response?.data?.status) {
                const token = response.data.data.session.session_token;
                Cookies.set("AUTH-TOKEN", token);
                await fetchUserData(); 
                toast.success('Logged in with Google!');
                onClose();
            } else {
                toast.error(response.data.msg || 'Google login failed.');
            }
        } catch (error) {
                console.log(error);
            toast.error(error.response?.data?.msg || 'Something went wrong during Google login.');
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true"></div>
                <div className="relative bg-white w-full max-w-md mx-auto rounded-2xl shadow-lg z-50 p-6">
                    {isGoogleLoading && (
                        <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-[1px] rounded-2xl flex items-center justify-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600" />
                        </div>
                    )}
                    <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>

                    <Dialog.Title className="text-xl font-semibold text-center mb-1">
                        {isLogin ? 'Sign In to your account' : 'Create your account'}
                    </Dialog.Title>

                    <p className="text-sm text-center text-gray-500 mb-4">
                        {isLogin ? 'Welcome back!' : 'Get started by creating your account.'}
                    </p>

                    <GoogleAuth
                        isLogin={isLogin}
                        loginWithGoogle={loginWithGoogle}
                        onStart={() => setIsGoogleLoading(true)}
                        onCancel={() => setIsGoogleLoading(false)}
                    />


                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                        <hr className="flex-1 border-gray-300" /> or <hr className="flex-1 border-gray-300" />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        {!isLogin && (
                            <>
                                <input
                                    {...register('name')}
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                                <input
                                    {...register('phone')}
                                    type="text"
                                    placeholder="Phone Number"
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

                                <select
                                    {...register('gender')}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                            </>
                        )}

                        <input
                            {...register('email')}
                            type="email"
                            placeholder="Email"
                            className="w-full border rounded-md px-3 py-2 text-sm"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                        <input
                            {...register('password')}
                            type="password"
                            placeholder="Password"
                            className="w-full border rounded-md px-3 py-2 text-sm"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                        <button type="submit" className="w-full bg-black text-white py-2 rounded-md">
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>

                    <p className="text-sm text-center mt-4">
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-indigo-600 hover:underline"
                        >
                            {isLogin ? 'Sign up' : 'Sign in'}
                        </button>
                    </p>
                </div>
            </div>
        </Dialog>
    );
}
