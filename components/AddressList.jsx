"use client";
import { useEffect, useState } from "react";
import { AddressLib } from "@/lib/address";
import AddAddressModal from "@/components/AddAddressModal";
import toast from "react-hot-toast";
import { MapPin, Plus } from "lucide-react";

export default function AddressList({ onSelect }) {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    const fetchAddresses = async () => {
        try {
            const res = await AddressLib.getAddresses();
            if (res.success) {
                setAddresses(res.data);
            }
        } catch (err) {
            console.error(err);
            toast.error("Could not load addresses");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleSelectAddress = (address) => {
        setSelectedAddressId(address.id);
        onSelect(address);
    };

    const handleAdd = () => {
        setEditData(null);
        setModalOpen(true);
    };

    const handleEdit = (address) => {
        setEditData(address);
        setModalOpen(true);
    };

    const handleSave = async (data) => {
        try {
            let res;
            if (editData) {
                res = await AddressLib.updateAddress(editData.id, data);
            } else {
                res = await AddressLib.addAddress(data);
            }
            if (res.success) {
                toast.success("Address saved!");
                fetchAddresses();
            }
        } catch (err) {
            toast.error("Error saving address");
        }
        setModalOpen(false);
    };

    if (loading) return <p>Loading addresses...</p>;

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {/* Header */}
            <div className="flex justify-end items-center mb-4">
                {/* <h2 className="text-xl font-semibold">
                    Shipping <span className="text-orange-600">Address</span>
                </h2> */}

                <button
                    onClick={handleAdd}
                    className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add New
                </button>
            </div>

            {/* No Address */}
            {addresses.length === 0 && (
                <p className="text-gray-500 text-center">No saved addresses. Add one.</p>
            )}

            {/* Address List */}
            <div className="space-y-3">
                {addresses.map((address) => {
                    const isSelected = selectedAddressId === address.id;

                    return (
                        <div
                            key={address.id}
                            onClick={() => handleSelectAddress(address)}
                            className={`relative border-2 rounded-lg p-4 cursor-pointer transition 
                                ${
                                    isSelected
                                        ? "border-orange-500 bg-orange-50"
                                        : "border-gray-200 hover:border-orange-300 hover:bg-gray-50"
                                }
                            `}
                        >
                            <div className="flex items-start gap-3">
                                {/* Icon */}
                                <MapPin
                                    size={20}
                                    className={`mt-1 flex-shrink-0 ${
                                        isSelected ? "text-orange-600" : "text-gray-400"
                                    }`}
                                />

                                {/* Address Details */}
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800">
                                        {address.first_name} {address.last_name}
                                    </p>

                                    <p className="text-sm text-gray-600 mt-1">{address.address}</p>

                                    <p className="text-sm text-gray-600">
                                        {address.city}, {address.country}
                                    </p>

                                    {address.phone && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            Phone: {address.phone}
                                        </p>
                                    )}
                                </div>

                                {/* Edit Button */}
                                <button
                                    className="text-orange-600 underline text-sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEdit(address);
                                    }}
                                >
                                    Edit
                                </button>

                                {/* Selected Checkmark */}
                                {isSelected && (
                                    <div className="flex-shrink-0">
                                        <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                                            <svg
                                                className="w-4 h-4 text-white"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <AddAddressModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
                editData={editData}
            />
        </div>
    );
}
