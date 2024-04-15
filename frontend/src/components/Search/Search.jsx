import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search.css";
const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState();
    const searchHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            // history.push(`/products/${keyword.trim()}`);
            // alternate
            navigate(`/products/${keyword.trim()}`);
        } else {
            navigate(`/products`);
        }
    };
    return (
        <Fragment>
            <form className="searchBox" onSubmit={searchHandler}>
                <input
                    type="text"
                    placeholder="Search a Product ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>
        </Fragment>
    );
};

export default Search;
