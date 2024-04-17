import React from 'react';
import { processPayment } from '../../api/api';

function CheckoutButton() {
    const handleClick = async (event) => {
        event.preventDefault();

        processPayment();
    };

    return (
        <button role="link" onClick={handleClick}>
            Checkout
        </button>
    );
}

export default CheckoutButton;
