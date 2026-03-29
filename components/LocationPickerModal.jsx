"use client";

import { useEffect, useRef, useCallback } from "react";
import Script from "next/script";

const LocationPickerModal = ({ isOpen, onClose, onConfirm }) => {
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const autocompleteRef = useRef(null);
    const latLngRef = useRef({ lat: 0, lng: 0 });
    const addressRef = useRef("");

    const loadMap = useCallback(() => {
        if (typeof window === "undefined" || !window.google || mapRef.current?.__mapInitialized) return;

        const map = new window.google.maps.Map(mapRef.current, {
            zoom: 12,
            center: { lat: 31.5204, lng: 74.3587 }, // Lahore default
            streetViewControl: false,
            mapTypeControl: false,
          });
    
          const marker = new window.google.maps.Marker({
            position: { lat: 31.5204, lng: 74.3587 },
            map,
            draggable: true,
          });

        mapRef.current.__mapInitialized = true;
        markerRef.current = marker;

        marker.addListener("dragend", (event) => {
            latLngRef.current = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            };
            map.panTo(event.latLng);
        });

        const input = document.getElementById("locationPickerSearchInput");
        const autocomplete = new window.google.maps.places.Autocomplete(input);
        autocompleteRef.current = autocomplete;

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (!place.geometry) return;

            const location = place.geometry.location;
            addressRef.current = place.formatted_address || "";

            latLngRef.current = {
                lat: location.lat(),
                lng: location.lng(),
            };

            marker.setPosition(location);
            map.panTo(location);
        });

        // Add current location button
        const currentLocationButton = document.createElement("button");
        currentLocationButton.type = "button"; // Prevent form submission
        currentLocationButton.textContent = "📍";
        currentLocationButton.title = "Use current location";
        Object.assign(currentLocationButton.style, {
            margin: "10px",
            border: "1px solid blue",
            backgroundColor: "white",
            padding: "12px 15px",
            borderRadius: "5px",
            cursor: "pointer",
        });

        currentLocationButton.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent any default behavior
            e.stopPropagation(); // Stop event bubbling
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    latLngRef.current = pos;
                    marker.setPosition(pos);
                    map.panTo(pos);
                });
            }
        });

        map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(currentLocationButton);
    }, []);

    useEffect(() => {
        if (isOpen) {
            loadMap();
        }
    }, [isOpen, loadMap]);

    const handleConfirm = () => {
        const { lat, lng } = latLngRef.current;
        onConfirm(lat, lng, addressRef.current);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`}
                strategy="afterInteractive"
                onLoad={loadMap}
            />
            <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
                <div className="bg-white w-full max-w-xl rounded-lg overflow-hidden shadow-xl">
                    <div className="p-4 border-b">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Pick Your Location</h2>
                            <button onClick={onClose} className="text-gray-600 text-xl">×</button>
                        </div>
                    </div>
                    <div className="p-4 space-y-3">
                        <input
                            id="locationPickerSearchInput"
                            type="text"
                            placeholder="Search location..."
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                        />
                        <div ref={mapRef} style={{ height: "300px" }} />
                    </div>
                    <div className="p-4 border-t flex justify-end space-x-2">
                        <button onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
                        <button onClick={handleConfirm} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Confirm Location
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LocationPickerModal;
