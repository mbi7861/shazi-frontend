"use client";

import { useEffect, useState } from "react";
import { AddressLib } from "@/lib/address";
import AddAddressModal from "@/components/AddAddressModal";
import toast from "react-hot-toast";
import { MapPin, Plus, Trash2 } from "lucide-react";

const MAX_ADDRESSES = 5;
import { useAuth } from "@/context/AuthContext";
import { countries, getStatesByCountry } from "@/lib/countriesStates";

export default function AddressList({ prevAddressId, onSelect }) {
    const { userData } = useAuth();
    const isLoggedIn = !!userData;

    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [addressErrors, setAddressErrors] = useState({});

    // -----------------------------
    // FETCH ADDRESSES
    // -----------------------------
    const fetchAddresses = async () => {
        try {
            const res = await AddressLib.getAddresses();
            if (!res.success) {
                toast.error(res.message || "Could not load addresses");
                setAddresses([]);
                return;
            }
            setAddresses(res.data ?? []);
            if (!res.data.length) {
                setModalOpen(true);
            }
        } catch (error) {
            console.error(error);
            toast.error("Could not load addresses");
            setAddresses([]);
            setModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [isLoggedIn]);
    useEffect(() => {
        if (!addresses.length) {
            return;
        }

        let selected = null;

        if (prevAddressId) {
            selected = addresses.find(a => a.id === prevAddressId) || null;
        }
        if (!selected) {
            selected = addresses[0];
        }
        setSelectedAddressId(selected.id);
        onSelect?.(selected);
    }, [addresses, prevAddressId]);

    // -----------------------------
    // SELECT ADDRESS
    // -----------------------------
    const selectAddress = (address) => {
        setSelectedAddressId(address.id);
        onSelect?.(address);
    };

    // -----------------------------
    // ADD / EDIT HANDLER
    // -----------------------------
    const openAddModal = () => {
        setEditData(null);
        setModalOpen(true);
    };

    const openEditModal = (address) => {
        setEditData(address);
        setModalOpen(true);
    };

    // -----------------------------
    // DELETE HANDLER
    // -----------------------------
    const handleDelete = async (e, address) => {
        e.stopPropagation();
        if (!confirm("Are you sure you want to delete this address?")) return;

        try {
            const res = await AddressLib.deleteAddress(address.id);
            if (res.success) {
                toast.success("Address deleted");
                const remaining = addresses.filter((a) => a.id !== address.id);
                setAddresses(remaining);
                if (selectedAddressId === address.id && remaining.length > 0) {
                    setSelectedAddressId(remaining[0].id);
                    onSelect?.(remaining[0]);
                } else if (remaining.length === 0) {
                    setSelectedAddressId(null);
                    onSelect?.(null);
                    setModalOpen(true);
                }
            } else {
                toast.error(res.message || "Could not delete address");
            }
        } catch (error) {
            console.error(error);
            toast.error("Could not delete address");
        }
    };

    // -----------------------------
    // LOADING STATE
    // -----------------------------
    if (loading) return <p className="text-center">Loading addresses...</p>;

    // -----------------------------
    // JSX
    // -----------------------------
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                {addresses.length >= MAX_ADDRESSES && (
                    <p className="text-sm text-gray-500">Maximum 5 addresses. Delete one to add another.</p>
                )}
                <div className="ml-auto">
                    {addresses.length < MAX_ADDRESSES && !modalOpen && (
                        <button
                            type="button"
                            onClick={openAddModal}
                            className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-primary/80"
                        >
                            <Plus size={18} />
                            Add Address
                        </button>
                    )}
                </div>
            </div>

            {/* Inline Add/Edit Address Form */}
            <AddAddressModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSuccess={(address, { isEdit } = {}) => {
                    if (!address) return;
                    setAddresses((prev) => {
                        if (isEdit) {
                            return prev.map((a) => (a.id === address.id ? address : a));
                        }
                        return [...prev, address];
                    });
                    setSelectedAddressId(address.id);
                    onSelect?.(address);
                }}
                editData={editData}
                errors={addressErrors}
            />

            {/* No Address */}
            {addresses.length === 0 && !modalOpen && (
                <p className="text-gray-500 text-center mb-4">No saved addresses. Add one.</p>
            )}

            {/* Address List */}
            {!modalOpen && (
                <div className="space-y-3">
                    {addresses.map((address) => {
                        const isSelected = selectedAddressId === address.id;
                        const fullName =
                            address.fullName ||
                            `${address.first_name || ""} ${address.last_name || ""}`.trim();

                        // Convert country code to country name for display
                        const countryCode = address.country_code || address.country || 'PK';
                        const countryObj = countries.find(c => c.code === countryCode);
                        const countryDisplayName = countryObj ? countryObj.name : countryCode;

                        // Convert state code to state name for display
                        const stateCode = address.state_code || address.state || '';
                        const states = getStatesByCountry(countryCode);
                        const stateObj = states.find(s => s.code === stateCode);
                        const stateDisplayName = stateObj ? stateObj.name : stateCode;

                        return (
                            <div
                                key={address.id}
                                onClick={() => selectAddress(address)}
                                className={`border-2 rounded-lg p-4 cursor-pointer transition
                            ${isSelected
                                        ? "border-primary bg-primary-light"
                                        : "border-gray-200 hover:border-orange-300 hover:bg-gray-50"
                                    }`}
                            >
                                <div className="flex gap-3 items-start">
                                    {/* Icon */}
                                    <MapPin
                                        size={20}
                                        className={isSelected ? "text-primary" : "text-gray-400"}
                                    />

                                    {/* Details */}
                                    <div className="flex-1">
                                        <p className="font-semibold">{fullName}</p>
                                    </div>

                                    {/* Edit & Delete Buttons */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openEditModal(address);
                                            }}
                                            className="text-primary underline text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={(e) => handleDelete(e, address)}
                                            className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50"
                                            title="Delete address"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    {/* Check mark */}
                                    {isSelected && (
                                        <div>
                                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                                <svg
                                                    className="w-4 h-4 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="mx-5">
                                    <p className="text-sm text-gray-600">{address.address}</p>
                                    <p className="text-sm text-gray-600">
                                        {address.city}, {stateDisplayName}, {countryDisplayName}
                                    </p>

                                    {address.phone && (
                                        <p className="text-sm text-gray-600">Phone: {address.phone}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

        </div>
    );
}
