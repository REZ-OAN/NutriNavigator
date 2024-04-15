import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../layouts/Header/MetaData.jsx";
import { Typography } from "@material-ui/core";
import { toast } from "react-toastify";
import { toastifyOptions } from "../../utils/toastify.js";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { MdCreditCard, MdEvent, MdVpnKey } from "react-icons/md";
import "./PaymentProcess.css";
import {
    createOrder,
    clearErrors,
} from "../../services/Actions/orderActions.js";
const ProcessPayment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);
    const { shippingInfo, cartItems } = useSelector((state) => state.cartR);
    const { user } = useSelector((state) => state.userR);
    const { error } = useSelector((state) => state.newOrderR);
    const navigate = useNavigate();
    console.log(stripe);
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const order = {
        shippinginfo: { ...shippingInfo },
        orderitems: [...cartItems],
        itemsprice: orderInfo.subtotal,
        tax: orderInfo.tax,
        shippingcost: orderInfo.shippingCharges,
        totalprice: orderInfo.totalPrice,
    };
    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            );

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;
                toast.error(result.error.message, { ...toastifyOptions });
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentinfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };
                    toast.success("Payment Process Successful", {
                        ...toastifyOptions,
                    });
                    createOrder(dispatch, order);
                    window.localStorage.setItem("cartItems", "");
                    navigate("/success");
                } else {
                    toast.error(
                        "There's some issue while processing payment ",
                        { ...toastifyOptions }
                    );
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            toast.error(error.response.data.error.message, {
                ...toastifyOptions,
            });
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error, { ...toastifyOptions });
            clearErrors(dispatch);
        }
    }, [dispatch, error]);

    return (
        <Fragment>
            <MetaData title="Payment" />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <form
                    className="paymentForm"
                    onSubmit={(e) => submitHandler(e)}
                >
                    <Typography>Card Info</Typography>
                    <div>
                        <MdCreditCard />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <MdEvent />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <MdVpnKey />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - ৳‎${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </Fragment>
    );
};

export default ProcessPayment;
