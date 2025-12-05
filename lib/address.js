// /lib/address.js
import { addressServices } from "@/services/addressServices";

export const AddressLib = {
    async getAddresses() {
        return addressServices.getAddresses();
    },

    async addAddress(payload) {
        return addressServices.addAddress(payload);
    },

    async updateAddress(id, payload) {
        return addressServices.updateAddress(id, payload);
    },

    async deleteAddress(id) {
        return addressServices.deleteAddress(id);
    },

    async setDefaultAddress(id) {
        return addressServices.setDefaultAddress(id);
    }
}
