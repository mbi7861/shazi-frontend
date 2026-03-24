import LocationPickerModal from "@/components/LocationPickerModal";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import {
  countries,
  getStatesByCountry,
  matchStateName,
} from "@/lib/countriesStates";
import { useAuth } from "@/context/AuthContext";
import { AddressLib } from "@/lib/address"; 

export default function AddAddressModal({
  isOpen,
  onClose,
  onSuccess,
  editData,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
    setError,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      zip_code: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      country: "Pakistan",
    },
  });

  const { userData } = useAuth();
  const [isLocationPickerOpen, setLocationPickerOpen] = useState(false);
  const [usedLocationPicker, setUsedLocationPicker] = useState(false);
  const [availableStates, setAvailableStates] = useState(
    getStatesByCountry("PK")
  );

  // Watch country changes to update available states
  const watchCountry = watch("country");

  useEffect(() => {
    const countryObj = countries.find((c) => c.name === watchCountry);
    if (countryObj) {
      const states = getStatesByCountry(countryObj.code);
      setAvailableStates(states);
      
      // Reset state if current state is not in the new country's states
      const currentState = watch("state");
      const currentStateExists = states.find((s) => s.name === currentState);
      if (currentState && !currentStateExists) {
        setValue("state", "");
      }
    }
  }, [watchCountry, setValue, watch]);

  // Load editData or user data when modal opens
  useEffect(() => {
    if (isOpen && editData) {
      // Handle both API address format and modal format
      const fullName =
        editData.fullName ||
        `${editData.first_name || ""} ${editData.last_name || ""}`.trim() ||
        "";
      const nameParts = fullName.split(" ");

      // Convert country code to country name if needed (for display)
      const countryCodeInput =
        editData.country_code || editData.country || "PK";
      let countryCode =
        countryCodeInput.length === 2 ? countryCodeInput.toUpperCase() : "PK";
      const countryObj = countries.find((c) => c.code === countryCode);
      const countryName = countryObj ? countryObj.name : "Pakistan";

      // Convert state code to state name if needed (for display)
      const states = getStatesByCountry(countryCode);
      let stateName = editData.state_code || editData.state || "";
      if (stateName && stateName.length <= 2) {
        // It's likely a state code, convert to name
        const stateObj = states.find((s) => s.code === stateName.toUpperCase());
        stateName = stateObj ? stateObj.name : stateName;
      }

      setValue("firstName", editData.firstName || nameParts[0] || "");
      setValue("lastName", editData.lastName || nameParts.slice(1).join(" ") || "");
      setValue("phoneNumber", editData.phoneNumber || editData.phone || "");
      setValue("zip_code", editData.zip_code || editData.postal_code || "");
      setValue("address", editData.address || "");
      setValue("apartment", editData.apartment || "");
      setValue("city", editData.city || "");
      setValue("state", stateName);
      setValue("country", countryName);
      setUsedLocationPicker(false);
    } else if (isOpen && !editData) {
      const fullName = userData?.name?.trim() || "";
      const firstSpaceIndex = fullName.indexOf(" ");

      let firstName = "";
      let lastName = "";

      if (firstSpaceIndex !== -1) {
        firstName = fullName.slice(0, firstSpaceIndex);
        lastName = fullName.slice(firstSpaceIndex + 1);
      } else {
        firstName = fullName;
      }

      reset({
        firstName: firstName || "",
        lastName: lastName || "",
        phoneNumber: "",
        zip_code: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        country: "Pakistan",
      });
      setUsedLocationPicker(false);
    }
  }, [isOpen, editData, userData, setValue, reset]);

  const handleLocationSelect = async (lat, lng) => {
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
          toast.error(
            "Location is not in Pakistan. Please select a location within Pakistan."
          );
          return;
        }

        // Match state name to our state
        const countryObj = countries.find((c) => c.name === "Pakistan");
        const currentStates = getStatesByCountry(countryObj?.code || "PK");
        let matchedStateName = stateName || "";
        if (countryObj && stateName) {
          const matchedStateCode = matchStateName(countryObj.code, stateName);
          if (matchedStateCode) {
            const stateObj = currentStates.find(
              (s) => s.code === matchedStateCode
            );
            matchedStateName = stateObj ? stateObj.name : stateName;
          } else {
            const stateObj = currentStates.find(
              (s) =>
                s.name.toLowerCase() === stateName.toLowerCase() ||
                s.name.toLowerCase().includes(stateName.toLowerCase()) ||
                stateName.toLowerCase().includes(s.name.toLowerCase())
            );
            matchedStateName = stateObj ? stateObj.name : stateName;
          }
        }

        setValue("address", addressText);
        setValue("zip_code", pin);
        setValue("city", city);
        setValue("state", matchedStateName);
        setValue("country", "Pakistan");
        setUsedLocationPicker(true);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      toast.error("Error getting location. Please try again.");
    }
  };

  const onSubmit = async (formData) => {
    // Convert country name to code
    const countryObj = countries.find((c) => c.name === formData.country);
    const countryCode = countryObj ? countryObj.code : "PK";

    // Convert state name to code
    const states = getStatesByCountry(countryCode);
    const stateObj = states.find((s) => s.name === formData.state);
    const stateCode = stateObj ? stateObj.code : formData.state;

    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phoneNumber,
      address: formData.address,
      address_2: formData.apartment || "",
      city: formData.city,
      state_code: stateCode,
      country_code: countryCode,
      zip_code: formData.zip_code || "",
    };

    try {
      const res = editData
        ? await AddressLib.updateAddress(editData.id, payload)
        : await AddressLib.addAddress(payload);

      if (res.success || res?.data?.id) {
        toast.success("Address saved successfully");
        // Pass newly created/updated address back to caller
        onSuccess?.(res.data, { isEdit: !!editData });
        reset(); // Reset form
        onClose();
        return;
      }

      // Handle API errors
      if (!res.success) {
        toast.error(res.message || "Error saving address");
        
        // Map API field names to form field names
        const fieldMap = {
          first_name: "firstName",
          last_name: "lastName",
          phone: "phoneNumber",
          zip_code: "zip_code",
          state_code: "state",
          country_code: "country",
          address_2: "apartment",
        };

        // Set field errors in React Hook Form
        Object.entries(res.errors || {}).forEach(([key, messages]) => {
          const mappedKey = fieldMap[key] || key;
          const errorMessage = Array.isArray(messages) ? messages[0] : messages;
          setError(mappedKey, { 
            type: "server", 
            message: errorMessage 
          });
        });
      }
    } catch (error) {
      console.error("Address save error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {editData ? "Edit Address" : "Add New Address"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
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
            {/* First Name & Last Name */}
            <div className="flex space-x-3">
              <label className="w-full text-sm font-medium text-gray-600">
                First Name *
                <input
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  className={`mt-1 px-3 py-2.5 focus:border-primary transition border rounded outline-none w-full text-gray-700 ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                  type="text"
                  placeholder="First name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </label>

              <label className="w-full text-sm font-medium text-gray-600">
                Last Name *
                <input
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  className={`mt-1 px-3 py-2.5 focus:border-primary transition border rounded outline-none w-full text-gray-700 ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                  type="text"
                  placeholder="Last name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </label>
            </div>

            {/* Phone Number */}
            <label className="block text-sm font-medium text-gray-600">
              Phone Number *
              <input
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
                className={`mt-1 px-3 py-2.5 focus:border-primary transition border rounded outline-none w-full text-gray-700 ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                }`}
                type="text"
                placeholder="Phone number"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phoneNumber.message}
                </p>
              )}
            </label>

            {/* Zip Code */}
            <label className="block text-sm font-medium text-gray-600">
              Zip Code
              <input
                {...register("zip_code")}
                className={`mt-1 px-3 py-2.5 focus:border-primary transition border rounded outline-none w-full text-gray-700 ${
                  errors.zip_code ? "border-red-500" : "border-gray-300"
                }`}
                type="text"
                placeholder="Zip code"
              />
              {errors.zip_code && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.zip_code.message}
                </p>
              )}
            </label>

            {/* Address */}
            <label className="block text-sm font-medium text-gray-600">
              Address (Area and Street) *
              <textarea
                {...register("address", {
                  required: "Address is required",
                })}
                className={`mt-1 px-3 py-2.5 focus:border-primary transition border rounded outline-none w-full text-gray-700 resize-none ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
                rows={4}
                placeholder="Address (Area and Street)"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.address.message}
                </p>
              )}
            </label>

            {/* Apartment Field with Disclaimer */}
            {usedLocationPicker && (
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-2">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> If you used "Use My Location", please
                  add apartment, suite, or unit details below. The autofilled
                  address may not include specific apartment information.
                </p>
              </div>
            )}
            <label className="block text-sm font-medium text-gray-600">
              Apartment, Suite, or Unit
              <input
                {...register("apartment")}
                className={`mt-1 px-3 py-2.5 focus:border-primary transition border rounded outline-none w-full text-gray-700 ${
                  errors.apartment ? "border-red-500" : "border-gray-300"
                }`}
                type="text"
                placeholder="Apartment, suite, or unit (optional)"
              />
              {errors.apartment && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.apartment.message}
                </p>
              )}
            </label>

            {/* City & State */}
            <div className="flex space-x-3">
              <label className="w-full text-sm font-medium text-gray-600">
                City/District/Town *
                <input
                  {...register("city", {
                    required: "City is required",
                  })}
                  className={`mt-1 px-3 py-2.5 focus:border-primary transition border rounded outline-none w-full text-gray-700 ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                  type="text"
                  placeholder="City"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.city.message}
                  </p>
                )}
              </label>

              <label className="w-full text-sm font-medium text-gray-600">
                State *
                <select
                  {...register("state", {
                    required: "State is required",
                  })}
                  className={`mt-1 px-3 py-2.5 focus:border-primary transition border rounded outline-none w-full text-gray-700 bg-white ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select State</option>
                  {availableStates.map((state) => (
                    <option key={state.code} value={state.name}>
                      {state.name} ({state.code})
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.state.message}
                  </p>
                )}
              </label>
            </div>

            {/* Country */}
            <label className="block text-sm font-medium text-gray-600">
              Country *
              <select
                {...register("country", {
                  required: "Country is required",
                  validate: (value) =>
                    value === "Pakistan" ||
                    "Currently, only Pakistan is supported",
                })}
                className={`mt-1 px-3 py-2.5 focus:border-primary transition border rounded outline-none w-full text-gray-700 bg-white ${
                  errors.country ? "border-red-500" : "border-gray-300"
                }`}
                onChange={(e) => {
                  const selectedCountry = e.target.value;
                  if (selectedCountry !== "Pakistan") {
                    toast.error(
                      "Currently, only Pakistan is supported. Please select Pakistan."
                    );
                    setValue("country", "Pakistan");
                    return;
                  }
                }}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name} ({country.code})
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.country.message}
                </p>
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
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="flex-1 bg-primary text-white py-3 hover:bg-orange-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Saving...
                </span>
              ) : (
                "Save Address"
              )}
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