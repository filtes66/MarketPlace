import React from "react";
import { useSelector } from "react-redux";
import { loadStripe } from '@stripe/stripe-js';
import { processPayment } from "../../api/api";
import "./Payment.css";

function Payment({ isValid }) {
    const { items } = useSelector((state) => state.cart);

    const processItem = (item) => ({
        price_data: {
            currency: "usd",
            product_data: { name: item.nom },
            unit_amount: item.prix * 100,
        },
        quantity: 1,
    });
    const order = items.map(processItem);

    const handleCheckout = async () => {
        const sessionId = await processPayment(order);
        const stripe = await loadStripe("pk_test_51OwUdj2KqL0gj8MlzwPAibNXx9Us6BSAGciESwtJuDjdnwioZtFpSoUm09WfHiB8bWEm0aYaCEYuaMk66g3YSG6f00GT9PEbnY");
        stripe.redirectToCheckout({ sessionId });
    };

    return (
        <button
            className="payment__button"
            onClick={handleCheckout}
            disabled={isValid}
        >
            Checkout
        </button>
    );
}
export default Payment;