import React, { Fragment, useEffect, useReef } from "react";
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
const ProcessPayment = () => {
    return <div>ProcessPayment</div>;
};

export default ProcessPayment;
