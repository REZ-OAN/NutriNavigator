import React from "react";
import ReactStars from "react-rating-stars-component";
const ReviewCard = ({ review }) => {
    const options = {
        edit: false,
        color: "rgb(201, 193, 193,.5)",
        activeColor: "#8EAC50",
        size: window.innerWidth < 600 ? 15 : 20,
        value: review.rating,
        isHalf: true,
    };
    return (
        <>
            <div className="reviewCard">
                <img src="" alt="User" />
                <p>{review.name}</p>
                {review.rating && <ReactStars {...options} />}
                <span>{review.comment}</span>
            </div>
        </>
    );
};

export default ReviewCard;
