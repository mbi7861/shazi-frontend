'use client'
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import LocationPickerModal from "@/components/LocationPickerModal";

const AddAddress = () => {

    const [isLocationPickerOpen, setLocationPickerOpen] = useState(false);
    const { getToken, userData } = useAuth();
    const router = useRouter();
    const [address, setAddress] = useState({
        fullName: '',
        phoneNumber: '',
        zip_code: '',
        area: '',
        city: '',
        state: '',
    })
    useEffect(() => {
        if (userData) {
            setAddress((prev) => ({
                ...prev,
                fullName: userData.name || '',
                phoneNumber: userData.phone || '',
            }));
        }
    }, [userData]);
    const handleLocationSelect = async (lat, lng, addressText) => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
        console.log(apiKey)
        const { data } = await axios.get(url);

        console.log(data)
        if (data.status === "OK") {
            const result = data.results[0];
            const components = result.address_components;

            const get = (type) =>
                components.find((c) => c.types.includes(type))?.long_name || "";

            const city = get("locality") || get("administrative_area_level_2");
            const state = get("administrative_area_level_1");
            const country = get("country");
            const pin = get("postal_code");
            console.log(pin)
            const address = result.formatted_address;

            setAddress((prev) => ({
                ...prev,
                address, // Full address
                zip_code: pin,
                city,
                state,
                country,
            }));
        }

    };
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {

            const token = await getToken()

            const { data } = await axios.post('/api/user/add-address', { address }, { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                toast.success(data.message)
                router.push('/cart')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
                <form onSubmit={onSubmitHandler} className="w-full">
                    <p className="text-2xl md:text-3xl text-gray-500">
                        Add Shipping <span className="font-semibold text-primary">Address</span>
                    </p>
                    <div
                        className="bg-blue-100 border border-blue-300 rounded p-4 flex justify-between items-center max-w-sm mt-10">
                        <p className="text-sm font-semibold text-gray-700">
                            Save time. Autofill your current location.
                        </p>
                        <button
                            type="button"
                            onClick={() => setLocationPickerOpen(true)}
                            className="border border-gray-400 text-sm px-4 py-1 rounded-full hover:bg-gray-100"
                        >
                            Autofill
                        </button>
                    </div>


                    <div className="space-y-3 max-w-sm mt-10">
                        {/* Full Name */}
                        <label className="block text-sm font-medium text-gray-600">
                            Full Name
                            <input
                                className="mt-1 px-2 py-2.5 focus:border-primary transition border border-gray-500/30 rounded outline-none w-full text-gray-700"
                                type="text"
                                placeholder="Full name"
                                onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                                value={address.fullName}
                            />
                        </label>

                        {/* Phone Number */}
                        <label className="block text-sm font-medium text-gray-600">
                            Phone Number
                            <input
                                className="mt-1 px-2 py-2.5 focus:border-primary transition border border-gray-500/30 rounded outline-none w-full text-gray-700"
                                type="text"
                                placeholder="Phone number"
                                onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                                value={address.phoneNumber}
                            />
                        </label>

                        {/* Pin Code */}
                        <label className="block text-sm font-medium text-gray-600">
                            Pin Code
                            <input
                                className="mt-1 px-2 py-2.5 focus:border-primary transition border border-gray-500/30 rounded outline-none w-full text-gray-700"
                                type="text"
                                placeholder="Zip code"
                                onChange={(e) => setAddress({ ...address, zip_code: e.target.value })}
                                value={address.zip_code}
                            />
                        </label>

                        {/* Area / Street */}
                        <label className="block text-sm font-medium text-gray-600">
                            Address (Area and Street)
                            <textarea
                                className="mt-1 px-2 py-2.5 focus:border-primary transition border border-gray-500/30 rounded outline-none w-full text-gray-700 resize-none"
                                rows={4}
                                placeholder="Address (Area and Street)"
                                onChange={(e) => setAddress({ ...address, address: e.target.value })}
                                value={address.address}
                            ></textarea>
                        </label>

                        {/* City & State */}
                        <div className="flex space-x-3">
                            <label className="w-full text-sm font-medium text-gray-600">
                                City/District/Town
                                <input
                                    className="mt-1 px-2 py-2.5 focus:border-primary transition border border-gray-500/30 rounded outline-none w-full text-gray-700"
                                    type="text"
                                    placeholder="City"
                                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                    value={address.city}
                                />
                            </label>

                            <label className="w-full text-sm font-medium text-gray-600">
                                State
                                <input
                                    className="mt-1 px-2 py-2.5 focus:border-primary transition border border-gray-500/30 rounded outline-none w-full text-gray-700"
                                    type="text"
                                    placeholder="State"
                                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                    value={address.state}
                                />
                            </label>
                        </div>

                        {/* Country */}
                        <label className="block text-sm font-medium text-gray-600">
                            Country
                            <input
                                className="mt-1 px-2 py-2.5 focus:border-primary transition border border-gray-500/30 rounded outline-none w-full text-gray-700"
                                type="text"
                                placeholder="Country"
                                onChange={(e) => setAddress({ ...address, country: e.target.value })}
                                value={address.country ?? "Pakistan"}
                            />
                        </label>
                    </div>
                    <button type="submit"
                        className="max-w-sm w-full mt-6 bg-primary text-white py-3 hover:bg-primary/80 uppercase">
                        Save address
                    </button>
                </form>
                <Image
                    className="md:mr-16 mt-16 md:mt-0"
                    src={assets.my_location_image}
                    alt="my_location_image"
                />
            </div>
            <LocationPickerModal
                isOpen={isLocationPickerOpen}
                onClose={() => setLocationPickerOpen(false)}
                onConfirm={handleLocationSelect}
            />
            <Footer />
        </>
    );
};

export default AddAddress;