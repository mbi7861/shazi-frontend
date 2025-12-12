import LocationPickerModal from "@/components/LocationPickerModal";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { countries, getStatesByCountry, matchStateName } from "@/lib/countriesStates";

export default function AddAddressModal({ isOpen, onClose, onSave, editData, errors = {} }) {
    const [address, setAddress] = useState({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      zip_code: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      country: 'Pakistan'
    });
    const [isLocationPickerOpen, setLocationPickerOpen] = useState(false);
    const [usedLocationPicker, setUsedLocationPicker] = useState(false);
    const [availableStates, setAvailableStates] = useState(getStatesByCountry("PK"));

    // Update available states when country changes
    useEffect(() => {
      const countryObj = countries.find(c => c.name === address.country);
      if (countryObj) {
        const states = getStatesByCountry(countryObj.code);
        setAvailableStates(states);
        // Reset state if current state is not in the new country's states
        const currentStateExists = states.find(s => s.name === address.state);
        if (address.state && !currentStateExists) {
          setAddress(prev => ({ ...prev, state: '' }));
        }
      }
    }, [address.country]);

    // Load editData when modal opens or editData changes
    useEffect(() => {
      if (isOpen && editData) {
        // Handle both API address format and modal format
        const fullName = editData.fullName || `${editData.first_name || ''} ${editData.last_name || ''}`.trim() || '';
        const nameParts = fullName.split(' ');
        
        // Convert country code to country name if needed (for display)
        const countryCodeInput = editData.country_code || editData.country || 'PK';
        let countryCode = countryCodeInput.length === 2 ? countryCodeInput.toUpperCase() : 'PK';
        const countryObj = countries.find(c => c.code === countryCode);
        const countryName = countryObj ? countryObj.name : 'Pakistan';
        
        // Convert state code to state name if needed (for display)
        const states = getStatesByCountry(countryCode);
        let stateName = editData.state_code || editData.state || '';
        if (stateName && stateName.length <= 2) {
          // It's likely a state code, convert to name
          const stateObj = states.find(s => s.code === stateName.toUpperCase());
          stateName = stateObj ? stateObj.name : stateName;
        }
        
        setAddress({
          firstName: editData.firstName || nameParts[0] || '',
          lastName: editData.lastName || nameParts.slice(1).join(' ') || '',
          phoneNumber: editData.phoneNumber || editData.phone || '',
          zip_code: editData.zip_code || editData.pincode || editData.postal_code || '',
          address: editData.address || '',
          apartment: editData.apartment || '',
          city: editData.city || '',
          state: stateName,
          country: countryName
        });
        setUsedLocationPicker(false);
      } else if (isOpen && !editData) {
        // Reset form when opening for new address
        setAddress({
          firstName: '',
          lastName: '',
          phoneNumber: '',
          zip_code: '',
          address: '',
          apartment: '',
          city: '',
          state: '',
          country: 'Pakistan'
        });
        setUsedLocationPicker(false);
      }
    }, [isOpen, editData]);
  
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
          const stateName = get("administrative_area_level_1");
          const countryName = get("country");
          const pin = get("postal_code");
          const addressText = result.formatted_address;

          // Check if country is Pakistan
          if (countryName && countryName.toLowerCase() !== "pakistan") {
            toast.error("Location is not in Pakistan. Please select a location within Pakistan.");
            return;
          }

          // Match state name to our state
          const countryObj = countries.find(c => c.name === "Pakistan");
          const currentStates = getStatesByCountry(countryObj?.code || "PK");
          let matchedStateName = stateName || '';
          if (countryObj && stateName) {
            const matchedStateCode = matchStateName(countryObj.code, stateName);
            if (matchedStateCode) {
              // Find the state object to get the full name
              const stateObj = currentStates.find(s => s.code === matchedStateCode);
              matchedStateName = stateObj ? stateObj.name : stateName;
            } else {
              // If no match found, try to find by name (case insensitive)
              const stateObj = currentStates.find(s => 
                s.name.toLowerCase() === stateName.toLowerCase() ||
                s.name.toLowerCase().includes(stateName.toLowerCase()) ||
                stateName.toLowerCase().includes(s.name.toLowerCase())
              );
              matchedStateName = stateObj ? stateObj.name : stateName;
            }
          }
  
          setAddress((prev) => ({
            ...prev,
            address: addressText,
            zip_code: pin,
            city,
            state: matchedStateName,
            country: 'Pakistan'
          }));
          setUsedLocationPicker(true);
        }
      } catch (error) {
        console.error("Geocoding error:", error);
        toast.error("Error getting location. Please try again.");
      }
    };
  
    const handleSubmit = () => {
      if (!address.firstName || !address.lastName || !address.phoneNumber || !address.address || !address.city || !address.state) {
        alert("Please fill in all required fields");
        return;
      }
      onSave(address);
      if (!editData) {
        // Only reset if not editing
        setAddress({
          firstName: '',
          lastName: '',
          phoneNumber: '',
          zip_code: '',
          address: '',
          apartment: '',
          city: '',
          state: '',
          country: 'Pakistan'
        });
        setUsedLocationPicker(false);
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">{editData ? 'Edit Address' : 'Add New Address'}</h2>
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
  
            {/* General Error Message */}
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {errors.general}
              </div>
            )}

            <div className="space-y-4">
              {/* First Name & Last Name */}
              <div className="flex space-x-3">
                <label className="w-full text-sm font-medium text-gray-600">
                  First Name *
                  <input
                    className={`mt-1 px-3 py-2.5 focus:border-orange-500 transition border rounded outline-none w-full text-gray-700 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    type="text"
                    placeholder="First name"
                    onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                    value={address.firstName}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                  )}
                </label>

                <label className="w-full text-sm font-medium text-gray-600">
                  Last Name *
                  <input
                    className={`mt-1 px-3 py-2.5 focus:border-orange-500 transition border rounded outline-none w-full text-gray-700 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    type="text"
                    placeholder="Last name"
                    onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                    value={address.lastName}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                  )}
                </label>
              </div>

              {/* Phone Number */}
              <label className="block text-sm font-medium text-gray-600">
                Phone Number *
                <input
                  className={`mt-1 px-3 py-2.5 focus:border-orange-500 transition border rounded outline-none w-full text-gray-700 ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  type="text"
                  placeholder="Phone number"
                  onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                  value={address.phoneNumber}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
                )}
              </label>

              {/* Zip Code */}
              <label className="block text-sm font-medium text-gray-600">
                Zip Code
                <input
                  className={`mt-1 px-3 py-2.5 focus:border-orange-500 transition border rounded outline-none w-full text-gray-700 ${
                    errors.zip_code ? 'border-red-500' : 'border-gray-300'
                  }`}
                  type="text"
                  placeholder="Zip code"
                  onChange={(e) => setAddress({ ...address, zip_code: e.target.value })}
                  value={address.zip_code}
                />
                {errors.zip_code && (
                  <p className="mt-1 text-sm text-red-500">{errors.zip_code}</p>
                )}
              </label>

              {/* Address */}
              <label className="block text-sm font-medium text-gray-600">
                Address (Area and Street) *
                <textarea
                  className={`mt-1 px-3 py-2.5 focus:border-orange-500 transition border rounded outline-none w-full text-gray-700 resize-none ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows={4}
                  placeholder="Address (Area and Street)"
                  onChange={(e) => setAddress({ ...address, address: e.target.value })}
                  value={address.address}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                )}
              </label>

              {/* Apartment Field with Disclaimer */}
              {usedLocationPicker && (
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-2">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> If you used "Use My Location", please add apartment, suite, or unit details below. The autofilled address may not include specific apartment information.
                  </p>
                </div>
              )}
              <label className="block text-sm font-medium text-gray-600">
                Apartment, Suite, or Unit
                <input
                  className={`mt-1 px-3 py-2.5 focus:border-orange-500 transition border rounded outline-none w-full text-gray-700 ${
                    errors.apartment ? 'border-red-500' : 'border-gray-300'
                  }`}
                  type="text"
                  placeholder="Apartment, suite, or unit (optional)"
                  onChange={(e) => setAddress({ ...address, apartment: e.target.value })}
                  value={address.apartment}
                />
                {errors.apartment && (
                  <p className="mt-1 text-sm text-red-500">{errors.apartment}</p>
                )}
              </label>

              {/* City & State */}
              <div className="flex space-x-3">
                <label className="w-full text-sm font-medium text-gray-600">
                  City/District/Town *
                  <input
                    className={`mt-1 px-3 py-2.5 focus:border-orange-500 transition border rounded outline-none w-full text-gray-700 ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                    type="text"
                    placeholder="City"
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    value={address.city}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                  )}
                </label>

                <label className="w-full text-sm font-medium text-gray-600">
                  State *
                  <select
                    className={`mt-1 px-3 py-2.5 focus:border-orange-500 transition border rounded outline-none w-full text-gray-700 bg-white ${
                      errors.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  >
                    <option value="">Select State</option>
                    {availableStates.map((state) => (
                      <option key={state.code} value={state.name}>
                        {state.name} ({state.code})
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                  )}
                </label>
              </div>

              {/* Country */}
              <label className="block text-sm font-medium text-gray-600">
                Country *
                <select
                  className={`mt-1 px-3 py-2.5 focus:border-orange-500 transition border rounded outline-none w-full text-gray-700 bg-white ${
                    errors.country ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={address.country}
                  onChange={(e) => {
                    const selectedCountry = e.target.value;
                    if (selectedCountry !== "Pakistan") {
                      toast.error("Currently, only Pakistan is supported. Please select Pakistan.");
                      return;
                    }
                    setAddress({ ...address, country: selectedCountry, state: '' });
                  }}
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.name}>
                      {country.name} ({country.code})
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="mt-1 text-sm text-red-500">{errors.country}</p>
                )}
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