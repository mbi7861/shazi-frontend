import { z } from "zod"

const checkoutSchema = z
    .object({
        // Customer Information
        email: z.string().email("Please enter a valid email address"),
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        phone: z
            .string()
            .min(1, "Phone number is required")
            .regex(/^\+?[\d\s-()]+$/, "Please enter a valid phone number"),

        // Shipping Address
        country: z.string().min(1, "Country is required"),
        address: z.string().min(1, "Address is required"),
        apartment: z.string().optional(),
        city: z.string().min(1, "City is required"),
        postalCode: z.string().optional(),

        // Payment & Shipping
        shippingMethod: z.string().min(1, "Shipping method is required"),
        paymentMethod: z.string().min(1, "Payment method is required"),

        // Billing Address (conditional)
        sameAsBilling: z.boolean().optional(),
        billingCountry: z.string().optional(),
        billingFirstName: z.string().optional(),
        billingLastName: z.string().optional(),
        billingAddress: z.string().optional(),
        billingApartment: z.string().optional(),
        billingCity: z.string().optional(),
        billingPostalCode: z.string().optional(),
        billingPhone: z.string().optional(),

        // Optional
        discountCode: z.string().optional(),
    })
    .refine(
        (data) => {
            // If billing address is different, validate billing fields
            if (!data.sameAsBilling) {
                return (
                    data.billingCountry &&
                    data.billingFirstName &&
                    data.billingLastName &&
                    data.billingAddress &&
                    data.billingCity &&
                    data.billingPhone
                )
            }
            return true
        },
        {
            message: "Billing address fields are required when using a different billing address",
            path: ["billingAddress"],
        },
    )

// Validation function
export const validateCheckoutForm = (formData) => {
    return checkoutSchema.parse(formData)
}

// Individual field validation functions
export const validateEmail = (email) => {
    try {
        z.string().email().parse(email)
        return { isValid: true, error: null }
    } catch (error) {
        return { isValid: false, error: error.errors[0].message }
    }
}

export const validatePhone = (phone) => {
    try {
        z.string()
            .min(1)
            .regex(/^\+?[\d\s-()]+$/)
            .parse(phone)
        return { isValid: true, error: null }
    } catch (error) {
        return { isValid: false, error: "Please enter a valid phone number" }
    }
}

export const validateRequired = (value, fieldName) => {
    try {
        z.string().min(1, `${fieldName} is required`).parse(value)
        return { isValid: true, error: null }
    } catch (error) {
        return { isValid: false, error: error.errors[0].message }
    }
}
