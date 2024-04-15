import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../services/Actions/cartActions.js";
import MetaData from "../layouts/Header/MetaData";
import {
    MdPinDrop,
    MdHome,
    MdLocationCity,
    MdPublic,
    MdPhone,
    MdTransferWithinAStation,
} from "react-icons/md";
import { toast } from "react-toastify";
import { toastifyOptions } from "../../utils/toastify";
import { Country, State } from "country-state-city";
import "./ShippingInfo.css";
import CheckoutSteps from "./CheckoutSteps.jsx";
const ShippingInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shippingInfo } = useSelector((state) => state.cartR);
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 11 || phoneNo.length > 11) {
            toast.error("Phone Number should be 10 digits Long", {
                ...toastifyOptions,
            });
            return;
        }
        saveShippingInfo(dispatch, {
            address,
            city,
            state,
            country,
            pinCode,
            phoneNo,
        });
        navigate("/order/confirm");
    };

    return (
        <Fragment>
            <MetaData title="Shipping Details" />

            <CheckoutSteps activeStep={0} />

            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>

                    <form
                        className="shippingForm"
                        encType="multipart/form-data"
                        onSubmit={shippingSubmit}
                    >
                        <div>
                            <MdHome />
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div>
                            <MdLocationCity />
                            <input
                                type="text"
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div>
                            <MdPinDrop />
                            <input
                                type="number"
                                placeholder="Pin Code"
                                required
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </div>

                        <div>
                            <MdPhone />
                            <input
                                type="text"
                                placeholder="Phone Number"
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                size="11"
                            />
                        </div>

                        <div>
                            <MdPublic />

                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option
                                            key={item.isoCode}
                                            value={item.isoCode}
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {country && (
                            <div>
                                <MdTransferWithinAStation />

                                <select
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map(
                                            (item) => (
                                                <option
                                                    key={item.isoCode}
                                                    value={item.isoCode}
                                                >
                                                    {item.name}
                                                </option>
                                            )
                                        )}
                                </select>
                            </div>
                        )}

                        <input
                            type="submit"
                            value="Continue"
                            className="shippingBtn"
                            disabled={state ? false : true}
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default ShippingInfo;
