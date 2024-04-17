import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveOrder } from "../../store/reducers/payment/slice";
import "./Success.css";
//import useAuthentication from "../../lib/hooks/useAuthentication";

function Success() {
    const { items } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { handleAuthentication } = useAuthentication(dispatch);

    const saveOrderToStateAndDB = async (user) => {
        const total = localStorage.getItem('total');
        const order = { user, items, total: Number(total) };
        dispatch(saveOrder(order));
    }

    const clearCartItems = () => {
        localStorage.setItem("items", []);
    };

    const redirectToHomePageAfterDelay = () => {
        setTimeout(() => {
            navigate("/");
        }, 4000);
    };

    useEffect(() => {
        (async () => {
            await saveOrderToStateAndDB(user);
            clearCartItems();
            redirectToHomePageAfterDelay();
        })();
    }, []);

    return (
        <>
            <div className="success">
                <div className="success__alert--success">
                    <p className="icontext">
                        <i className="success__icon--success fa fa-thumbs-up"></i>Thank you for
                        your order & your payment
                    </p>
                </div>
            </div>
        </>
    );
}
export default Success;