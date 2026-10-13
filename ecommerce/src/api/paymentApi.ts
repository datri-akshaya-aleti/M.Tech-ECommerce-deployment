import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export interface PaymentResponse {
    keyId: string;
    orderId: number;
    razorpayOrderId: string;
    amount: number;
    currency: string;
}

export const createOrder = async (
    items: { productId: number; quantity: number }[]
) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
        `${API_URL}/orders`,
        { items },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const createPayment = async (orderId: number): Promise<PaymentResponse> => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
        `${API_URL}/payment/create/${orderId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const verifyPayment = async (data: {
    orderId: number;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
}) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
        `${API_URL}/payment/verify`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};