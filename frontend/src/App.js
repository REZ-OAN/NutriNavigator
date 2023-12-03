import "./App.css";
import Header from "./components/layouts/Header/Header";
import Footer from "./components/layouts/Footer/Footer";
import Home from "./components/Home/Home";
import WebFont from "webfontloader";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Products from "./components/Product/Products.jsx";
import Search from "./components/Search/Search.jsx";
import Login from "./components/Login/Login.jsx";
import UserOptions from "./components/layouts/Header/UserOptions/UserOptions.jsx";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadUser } from "./services/Actions/userAction.js";
import Profile from "./components/Profile/Profile.jsx";
import UpdateProfile from "./components/Profile/UpdateProfile.jsx";
import UpdatePassword from "./components/Profile/UpdatePassword.jsx";
function App() {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.userR);
    useEffect(() => {
        WebFont.load({
            google: {
                families: ["Roboto", "Droid Sans", "Chilanka"],
            },
        });
        loadUser(dispatch);
    }, [dispatch]);
    return (
        <>
            <Router>
                <Header />

                {isAuthenticated && <UserOptions user={user["user"]} />}
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route
                        exact
                        path="/product/:id"
                        element={<ProductDetails />}
                    />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:keyword" element={<Products />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/update" element={<UpdateProfile />} />
                    <Route
                        path="/password/update"
                        element={<UpdatePassword />}
                    />
                </Routes>
                <ToastContainer />
                <Footer />
            </Router>
        </>
    );
}

export default App;
