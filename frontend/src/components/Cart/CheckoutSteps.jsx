import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import "./CheckoutSteps.css";
import {
    MdAccountBalance,
    MdLibraryAddCheck,
    MdLocalShipping,
} from "react-icons/md";

const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <MdLocalShipping />,
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <MdLibraryAddCheck />,
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <MdAccountBalance />,
        },
    ];

    const stepStyles = {
        boxSizing: "border-box",
    };

    return (
        <Fragment>
            <Stepper
                alternativeLabel
                activeStep={activeStep}
                style={stepStyles}
            >
                {steps.map((item, index) => (
                    <Step
                        key={index}
                        active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                    >
                        <StepLabel
                            style={{
                                color:
                                    activeStep >= index
                                        ? "#A9AB33"
                                        : "rgba(0, 0, 0, 0.649)",
                            }}
                            icon={item.icon}
                        >
                            {item.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Fragment>
    );
};

export default CheckoutSteps;
