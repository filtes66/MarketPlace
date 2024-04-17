import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { REACT_APP_BASE_URL } from '../config/environment';

export default async function getPhotos() {
    try {
        const response = await fetch(`${REACT_APP_BASE_URL}/photos`);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log("error getPhotos");
        console.log(err);
    }
}

export const getUser = async (body) => {
    try {
        const response = await axios.get(`${REACT_APP_BASE_URL}/user/${body.profile.email}`, {
            params: {
                email: body.profile.email,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Response failure: ${error}`);
    }
};

// POST
export const addUser = async (body) => {
    try {
        const response = await axios.post(`${REACT_APP_BASE_URL}/users/add`, body);
        return 'User profile successfully created';
    } catch (error) {
        throw new Error(`Response failure: ${error}`);
    }
};

export const addOrder = async (body) => {
    try {
        const response = await axios.post("/orders/add", body);
        // return 'Order successfully saved';
        return true;
    } catch (error) {
        throw new Error(`Response failure: ${error}`);
    }
};

// Stripe
export const processPayment = async (order) => {
    const response = await axios.post(`${REACT_APP_BASE_URL}/create-checkout-session`, order);
    const sessionID = response.data.id;
    return sessionID;
};
