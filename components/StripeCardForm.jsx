"use client";
import React, { useEffect, useImperativeHandle, forwardRef } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

// Wrap component with `forwardRef` so parent can call its methods
const StripeCardForm = forwardRef((_, ref) => {
    const stripe = useStripe();
    const elements = useElements();

    // Expose a method to parent via ref
    useImperativeHandle(ref, () => ({
        async getPaymentMethodId() {
            if (!stripe || !elements) {
                toast.error("Stripe has not loaded yet.");
                return null;
            }

            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                toast.error("Card element not found.");
                return null;
            }

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
            });

            if (error) {
                toast.error(error.message);
                return null;
            }

            return paymentMethod.id;
        },
    }));

    return (
        <div className="border border-gray-300 rounded-md p-4 mt-2">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#32325d",
                            "::placeholder": { color: "#a0aec0" },
                        },
                        invalid: {
                            color: "#fa755a",
                        },
                    },
                }}
            />
        </div>
    );
});

export default StripeCardForm;
