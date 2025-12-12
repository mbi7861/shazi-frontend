"use client";

import { useEffect, useState } from "react";
import { AddressLib } from "@/lib/address";
import AddAddressModal from "@/components/AddAddressModal";
import toast from "react-hot-toast";
import { MapPin, Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { countries, getStatesByCountry } from "@/lib/countriesStates";

export default function AddressList({ onSelect }) {
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

            const data = res?.data || (Array.isArray(res) ? res : []);
            setAddresses(data);
        } catch (error) {
            console.error(error);
            toast.error("Could not load addresses");
            setAddresses([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [isLoggedIn]);
    useEffect(() => {
        if (addresses.length > 0 && !selectedAddressId) {
            const first = addresses[0];
            setSelectedAddressId(first.id);
            onSelect?.(first);
        }
    }, [addresses]);
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
    // SAVE ADDRESS
    // -----------------------------
    const handleSave = async (form) => {
        setAddressErrors({});

        // Convert country name to country code
        const countryName = form.country || "Pakistan";
        const countryObj = countries.find(c => c.name === countryName);
        const countryCode = countryObj ? countryObj.code : "PK";

        // Convert state name to state code
        const states = getStatesByCountry(countryCode);
        const stateObj = states.find(s => s.name === form.state);
        const stateCode = stateObj ? stateObj.code : form.state;

        const payload = {
            first_name: form.firstName || "",
            last_name: form.lastName || "",
            phone: form.phoneNumber,
            address: form.address,
            address_2: form.apartment || "",
            city: form.city,
            state_code: stateCode,
            country_code: countryCode,
            zip_code: form.zip_code || "",
        };

        try {
            const res = editData
                ? await AddressLib.updateAddress(editData.id, payload)
                : await AddressLib.addAddress(payload);

            if (res.success || res?.data?.id) {
                toast.success("Address saved");
                fetchAddresses();
                setModalOpen(false);
                return;
            }

            // VALIDATION ERRORS
            if (res.errors) {
                const mapped = {};
                const fieldMap = {
                    first_name: "firstName",
                    last_name: "lastName",
                    phone: "phoneNumber",
                    zip_code: "zip_code",
                    state_code: "state",
                    country_code: "country",
                };

                for (const key in res.errors) {
                    const mappedKey = fieldMap[key] || key;
                    mapped[mappedKey] = Array.isArray(res.errors[key])
                        ? res.errors[key][0]
                        : res.errors[key];
                }

                setAddressErrors(mapped);
                toast.error("Fix errors in the form");
                return;
            }

            toast.error(res.message || "Error saving address");

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    // -----------------------------
    // LOADING STATE
    // -----------------------------
    if (loading) return <p>Loading addresses...</p>;

    // -----------------------------
    // JSX
    // -----------------------------
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {/* Header */}
            <div className="flex justify-end mb-4">
                <button
                    type="button"
                    onClick={openAddModal}
                    className="bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-orange-700"
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
                            ${
                                isSelected
                                    ? "border-orange-500 bg-orange-50"
                                    : "border-gray-200 hover:border-orange-300 hover:bg-gray-50"
                            }`}
                        >
                            <div className="flex gap-3 items-start">
                                {/* Icon */}
                                <MapPin
                                    size={20}
                                    className={isSelected ? "text-orange-600" : "text-gray-400"}
                                />

                                {/* Details */}
                                <div className="flex-1">
                                    <p className="font-semibold">{fullName}</p>
                                    <p className="text-sm text-gray-600">{address.address}</p>
                                    <p className="text-sm text-gray-600">
                                        {address.city}, {stateDisplayName}, {countryDisplayName}
                                    </p>

                                    {address.phone && (
                                        <p className="text-sm text-gray-600">Phone: {address.phone}</p>
                                    )}
                                </div>

                                {/* Edit Button */}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openEditModal(address);
                                    }}
                                    className="text-orange-600 underline text-sm"
                                >
                                    Edit
                                </button>

                                {/* Check mark */}
                                {isSelected && (
                                    <div>
                                        <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
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
                        </div>
                    );
                })}
            </div>

            {/* Modal */}
            <AddAddressModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
                editData={editData}
                errors={addressErrors}
            />
        </div>
    );
}
