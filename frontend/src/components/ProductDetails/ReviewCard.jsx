import React from "react";
import { Rating } from "@material-ui/lab";
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
                {review.rating && (
                    <Rating
                        name="read-only"
                        value={review.rating}
                        precision={0.5}
                        size="small"
                        readOnly
                    />
                )}
                <span>{review.comment}</span>
            </div>
        </>
    );
};

export default ReviewCard;
