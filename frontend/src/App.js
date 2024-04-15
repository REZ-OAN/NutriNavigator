import "./App.css";
import Header from "./components/layouts/Header/Header";
import Footer from "./components/layouts/Footer/Footer";
import Home from "./components/Home/Home";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
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
import ProtectedRoute from "./utils/routes/ProtectedRoute.jsx";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";
import Cart from "./components/Cart/Cart.jsx";
import ShippingInfo from "./components/Cart/ShippingInfo.jsx";
import ConfirmOrder from "./components/Cart/ConfirmOrder.jsx";
import ProcessPayment from "./components/Cart/ProcessPayment.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Success from "./components/Cart/Success.jsx";
import MyOrders from "./components/orders/MyOrders.jsx";
import OrderDetails from "./components/orders/OrderDetails.jsx";
import Dashboard from "./components/Admin/Dashboard/Dashboard.jsx";
import ProductList from "./components/Admin/ProductList/ProductList.jsx";
import NewProduct from "./components/Admin/NewProduct/NewProduct.jsx";
import UpdateProduct from "./components/Admin/UpdateProduct/UpdateProduct.jsx";
import OrderList from "./components/Admin/OrderList/OrderList.jsx";
import OrderUpdate from "./components/Admin/OrderUpdate/OrderUpdate.jsx";
import UsersList from "./components/Admin/UsersList/UsersList.jsx";
import ReviewList from "./components/Admin/ReviewsList/ReviewList.jsx";
import UpdateUser from "./components/Admin/UpdateUser/UpdateUser.jsx";
import DietRecommend from "./components/DietRecommend/DietRecommend.jsx";
function App() {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.userR);
    const [stripeApi, setStripeApi] = useState();
    async function getStripeApiKey() {
        try {
            const { data } = await axios.get("/api/v1/stripeapikey");
            setStripeApi(data.apiKey);
        } catch (error) {
            console.log(error.response.data.error);
        }
    }
    useEffect(() => {
        WebFont.load({
            google: {
                families: ["Roboto", "Droid Sans", "Chilanka"],
            },
        });
        loadUser(dispatch);

        getStripeApiKey();
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
                    <Route path="/profile" element={<ProtectedRoute />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route path="/profile/update" element={<ProtectedRoute />}>
                        <Route
                            path="/profile/update"
                            element={<UpdateProfile />}
                        />
                    </Route>
                    <Route path="/password/update" element={<ProtectedRoute />}>
                        <Route
                            path="/password/update"
                            element={<UpdatePassword />}
                        />
                    </Route>
                    <Route
                        path="/password/forgot"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/password/reset/:token"
                        element={<ResetPassword />}
                    />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/shipping" element={<ProtectedRoute />}>
                        <Route path="/shipping" element={<ShippingInfo />} />
                    </Route>
                    <Route path="/order/confirm" element={<ProtectedRoute />}>
                        <Route
                            path="/order/confirm"
                            element={<ConfirmOrder />}
                        />
                    </Route>
                    <Route path="/success" element={<ProtectedRoute />}>
                        <Route path="/success" element={<Success />} />
                    </Route>

                    <Route path="/orders/me" element={<ProtectedRoute />}>
                        <Route path="/orders/me" element={<MyOrders />} />
                    </Route>
                    <Route path="/order/:id" element={<ProtectedRoute />}>
                        <Route path="/order/:id" element={<OrderDetails />} />
                    </Route>
                    {stripeApi && (
                        <Route
                            path="/process/payment"
                            element={<ProtectedRoute />}
                        >
                            <Route
                                path="/process/payment"
                                element={
                                    <Elements stripe={loadStripe(stripeApi)}>
                                        <ProcessPayment />
                                    </Elements>
                                }
                            />
                        </Route>
                    )}
                    {(user?.user?.role === "admin" ||
                        user?.user?.role === "master") && (
                        <Route
                            path="/admin/dashboard"
                            element={<ProtectedRoute />}
                        >
                            <Route
                                path="/admin/dashboard"
                                element={<Dashboard />}
                            />
                        </Route>
                    )}
                    {(user?.user?.role === "admin" ||
                        user?.user?.role === "master") && (
                        <Route
                            path="/admin/products"
                            element={<ProtectedRoute />}
                        >
                            <Route
                                path="/admin/products"
                                element={<ProductList />}
                            />
                        </Route>
                    )}
                    {(user?.user?.role === "admin" ||
                        user?.user?.role === "master") && (
                        <Route
                            path="/admin/product"
                            element={<ProtectedRoute />}
                        >
                            <Route
                                path="/admin/product"
                                element={<NewProduct />}
                            />
                        </Route>
                    )}
                    {(user?.user?.role === "admin" ||
                        user?.user?.role === "master") && (
                        <Route
                            path="/admin/product/:id"
                            element={<ProtectedRoute />}
                        >
                            <Route
                                path="/admin/product/:id"
                                element={<UpdateProduct />}
                            />
                        </Route>
                    )}
                    {(user?.user?.role === "admin" ||
                        user?.user?.role === "master") && (
                        <Route
                            path="/admin/orders"
                            element={<ProtectedRoute />}
                        >
                            <Route
                                path="/admin/orders"
                                element={<OrderList />}
                            />
                        </Route>
                    )}
                    {(user?.user?.role === "admin" ||
                        user?.user?.role === "master") && (
                        <Route path="/admin/users" element={<ProtectedRoute />}>
                            <Route
                                path="/admin/users"
                                element={<UsersList />}
                            />
                        </Route>
                    )}
                    {(user?.user?.role === "admin" ||
                        user?.user?.role === "master") && (
                        <Route
                            path="/admin/user/:id"
                            element={<ProtectedRoute />}
                        >
                            <Route
                                path="/admin/user/:id"
                                element={<UpdateUser />}
                            />
                        </Route>
                    )}
                    {(user?.user?.role === "admin" ||
                        user?.user?.role === "master") && (
                        <Route
                            path="/admin/reviews"
                            element={<ProtectedRoute />}
                        >
                            <Route
                                path="/admin/reviews"
                                element={<ReviewList />}
                            />
                        </Route>
                    )}
                    {(user?.user?.role === "admin" ||
                        user?.user?.role === "master") && (
                        <Route
                            path="/admin/order/:id"
                            element={<ProtectedRoute />}
                        >
                            <Route
                                path="/admin/order/:id"
                                element={<OrderUpdate />}
                            />
                        </Route>
                    )}
                    <Route path="/dietrecommend" element={<ProtectedRoute />}>
                        <Route
                            path="/dietrecommend"
                            element={<DietRecommend />}
                        />
                    </Route>
                </Routes>
                <ToastContainer />
                <Footer />
            </Router>
        </>
    );
}

export default App;
