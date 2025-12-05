import LocationPickerModal from "@/components/LocationPickerModal";
import { useState } from "react";
import { X } from "lucide-react";

export default function AddAddressModal({ isOpen, onClose, onSave }) {
    const [address, setAddress] = useState({
      fullName: '',
      phoneNumber: '',
      pincode: '',
      address: '',
      city: '',
      state: '',
      country: 'Pakistan'
    });
    const [isLocationPickerOpen, setLocationPickerOpen] = useState(false);
  
    const handleLocationSelect = async (lat, lng) => {
      // Your Google Maps API logic here
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
  
        if (data.status === "OK") {
          const result = data.results[0];
          const components = result.address_components;
  
          const get = (type) =>
            components.find((c) => c.types.includes(type))?.long_name || "";
  
          const city = get("locality") || get("administrative_area_level_2");
          const state = get("administrative_area_level_1");
          const pin = get("postal_code");
          const addressText = result.formatted_address;
  
          setAddress((prev) => ({
            ...prev,
            address: addressText,
            pincode: pin,
            city,
            state,
          }));
        }
      } catch (error) {
        console.error("Geocoding error:", error);
      }
    };
  
    const handleSubmit = () => {
      if (!address.fullName || !address.phoneNumber || !address.address || !address.city || !address.state) {
        alert("Please fill in all required fields");
        return;
      }
      onSave(address);
      setAddress({
        fullName: '',
        phoneNumber: '',
        pincode: '',
        address: '',
        city: '',
        state: '',
        country: 'Pakistan'
      });
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Add New Address</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
  
          <div className="p-6">
            {/* Autofill Button */}
            <div className="bg-blue-100 border border-blue-300 rounded p-4 flex justify-between items-center mb-6">
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
  
            <div className="space-y-4">
              {/* Full Name */}
              <label className="block text-sm font-medium text-gray-600">
                Full Name *
                <input
                  className="mt-1 px-3 py-2.5 focus:border-orange-500 transition border border-gray-300 rounded outline-none w-full text-gray-700"
                  type="text"
                  placeholder="Full name"
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  value={address.fullName}
                />
              </label>
  
              {/* Phone Number */}
              <label className="block text-sm font-medium text-gray-600">
                Phone Number *
                <input
                  className="mt-1 px-3 py-2.5 focus:border-orange-500 transition border border-gray-300 rounded outline-none w-full text-gray-700"
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
                  className="mt-1 px-3 py-2.5 focus:border-orange-500 transition border border-gray-300 rounded outline-none w-full text-gray-700"
                  type="text"
                  placeholder="Pin code"
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  value={address.pincode}
                />
              </label>
  
              {/* Address */}
              <label className="block text-sm font-medium text-gray-600">
                Address (Area and Street) *
                <textarea
                  className="mt-1 px-3 py-2.5 focus:border-orange-500 transition border border-gray-300 rounded outline-none w-full text-gray-700 resize-none"
                  rows={4}
                  placeholder="Address (Area and Street)"
                  onChange={(e) => setAddress({ ...address, address: e.target.value })}
                  value={address.address}
                />
              </label>
  
              {/* City & State */}
              <div className="flex space-x-3">
                <label className="w-full text-sm font-medium text-gray-600">
                  City/District/Town *
                  <input
                    className="mt-1 px-3 py-2.5 focus:border-orange-500 transition border border-gray-300 rounded outline-none w-full text-gray-700"
                    type="text"
                    placeholder="City"
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    value={address.city}
                  />
                </label>
  
                <label className="w-full text-sm font-medium text-gray-600">
                  State *
                  <input
                    className="mt-1 px-3 py-2.5 focus:border-orange-500 transition border border-gray-300 rounded outline-none w-full text-gray-700"
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
                  className="mt-1 px-3 py-2.5 focus:border-orange-500 transition border border-gray-300 rounded outline-none w-full text-gray-700"
                  type="text"
                  placeholder="Country"
                  value={address.country}
                  onChange={(e) => setAddress({ ...address, country: e.target.value })}
                />
              </label>
            </div>
  
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-300 text-gray-700 py-3 hover:bg-gray-50 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-orange-600 text-white py-3 hover:bg-orange-700 rounded"
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
        <LocationPickerModal
                isOpen={isLocationPickerOpen}
                onClose={() => setLocationPickerOpen(false)}
                onConfirm={handleLocationSelect}
            />
      </div>
    );
  }