import React, { Fragment, useState } from "react";
import {
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
} from "@material-ui/core";
import "./DietRecommend.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const DietRecommend = () => {
    const [age, setAge] = useState(0);
    const [height, setHeight] = useState(0.0);
    const [weight, setWeight] = useState(0.0);
    const [gender, setGender] = useState(0);
    const [azma, setAzma] = useState(0);
    const [diabetes, setDiabetes] = useState(0);
    const [animia, setAnimia] = useState(0);
    const [allergies, setAllergies] = useState(0);
    const [cholesterol, setCholesterol] = useState(0);
    const [hbp, setHbp] = useState(0);
    const [lbp, setLbp] = useState(0);
    const [recommended_foods, setRecommendedFoods] = useState([]);
    const navigate = useNavigate();
    const recommendHandler = async (e) => {
        try {
            const diesease = [
                hbp,
                lbp,
                animia,
                allergies,
                cholesterol,
                azma,
                diabetes,
            ];
            const reqBody = {
                age,
                height,
                weight,
                gender,
                diesease,
            };
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            };

            const { data } = await axios.post(
                "http://127.0.0.1:5000/recommend",
                { ...reqBody },
                config
            );
            const keywords = data.recommended_foods;
            const { data: Data } = await axios.post(
                "/api/v1/getrecommendedproduct",
                { keywords },
                config
            );
            setRecommendedFoods(Data.recommended_foods);
        } catch (error) {
            console.log(error.response);
        }
        setAge(0);
        setAllergies(0);
        setAnimia(0);
        setAzma(0);
        setCholesterol(0);
        setDiabetes(0);
        setGender(0);
        setHbp(0);
        setHeight(0);
        setWeight(0);
        setLbp(0);
    };
    return (
        <Fragment>
            <div className="mainDietContainer">
                <div className="dietrec-container">
                    <div className="dietrec-header">
                        <h2>Get Your Recommened Food</h2>
                        <p>We Do Not Share This Information Anywhere</p>
                    </div>
                    <div className="dietrec-form">
                        <TextField
                            label="Age"
                            color="success"
                            value={age}
                            placeholder="enter your age"
                            onChange={(e) => {
                                setAge(Number(e.target.value));
                            }}
                        />
                        <TextField
                            color="success"
                            label="Height (meter)"
                            value={height}
                            placeholder="enter your height (unit meter)"
                            onChange={(e) => {
                                setHeight(e.target.value);
                            }}
                        />
                        <TextField
                            label="Weight (kg)"
                            color="success"
                            value={weight}
                            placeholder="enter your weight (unit kg)"
                            onChange={(e) => {
                                setWeight(e.target.value);
                            }}
                        />
                        <div>
                            <InputLabel id="demo-simple-select-label">
                                Gender
                            </InputLabel>
                            <Select
                                value={gender}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={(e) => {
                                    setGender(Number(e.target.value));
                                }}
                            >
                                <MenuItem value={1}>Male</MenuItem>
                                <MenuItem value={0}>Female</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <InputLabel id="demo-simple-select-label">
                                Do you Have Animia?
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={animia}
                                onChange={(e) => {
                                    setAnimia(Number(e.target.value));
                                }}
                            >
                                <MenuItem value={3}>YES</MenuItem>
                                <MenuItem value={0}>NO</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <InputLabel id="demo-simple-select-label">
                                Do you Have Allergies?
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={allergies}
                                onChange={(e) => {
                                    setAllergies(Number(e.target.value));
                                }}
                            >
                                <MenuItem value={4}>YES</MenuItem>
                                <MenuItem value={0}>NO</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <InputLabel id="demo-simple-select-label">
                                Do you Have Diabetes?
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={diabetes}
                                onChange={(e) => {
                                    setDiabetes(Number(e.target.value));
                                }}
                            >
                                <MenuItem value={7}>YES</MenuItem>
                                <MenuItem value={0}>NO</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <InputLabel id="demo-simple-select-label">
                                Do you Have Azma?
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={azma}
                                onChange={(e) => {
                                    setAzma(Number(e.target.value));
                                }}
                            >
                                <MenuItem value={6}>YES</MenuItem>
                                <MenuItem value={0}>NO</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <InputLabel id="demo-simple-select-label">
                                Do you Have Cholesterol Related Problem?
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={cholesterol}
                                onChange={(e) => {
                                    setCholesterol(Number(e.target.value));
                                }}
                            >
                                <MenuItem value={5}>YES</MenuItem>
                                <MenuItem value={0}>NO</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <InputLabel id="demo-simple-select-label">
                                Do you Have High Blood Pressure?
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={hbp}
                                onChange={(e) => {
                                    setHbp(Number(e.target.value));
                                }}
                            >
                                <MenuItem value={1}>YES</MenuItem>
                                <MenuItem value={0}>NO</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <InputLabel id="demo-simple-select-label">
                                Do you Have Low Blood Pressure?
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={lbp}
                                onChange={(e) => {
                                    setLbp(Number(e.target.value));
                                }}
                            >
                                <MenuItem value={2}>YES</MenuItem>
                                <MenuItem value={0}>NO</MenuItem>
                            </Select>
                        </div>
                        <Button
                            style={{
                                backgroundColor: "#93942d",
                                color: "white",
                                fontSize: "18px",
                                height: "45px",
                                marginTop: "20px",
                                width: "50%",
                            }}
                            onClick={recommendHandler}
                        >
                            Get Recommendations
                        </Button>
                    </div>
                </div>
                <div className="recommendedFoods">
                    {recommended_foods &&
                        recommended_foods.map((food) => {
                            return (
                                <Link
                                    key={food._id}
                                    style={{
                                        backgroundColor: "#93942d",
                                        color: "white",
                                        fontSize: "18px",
                                        wordWrap: "break-word",
                                        padding: "20px",
                                        borderRadius: "20px",
                                        textDecoration: "none",
                                        textAlign: "center",
                                        height: "fit-content",
                                        marginTop: "10px",
                                        width: "30%",
                                    }}
                                    to={`/product/${food._id}`}
                                >
                                    {food.name}
                                </Link>
                            );
                        })}
                </div>
            </div>
        </Fragment>
    );
};

export default DietRecommend;
