import "./App.css";

import React, { useCallback, useContext, useEffect, useState }from "react";

import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

import { UserContext } from "./context/UserContext";

import Navbar from "./components/partials/Navbar";
import Footer from "./components/partials/Footer";
import Loader from "./components/partials/Loader";

import Register from "./components/main/Register";
import Login from "./components/main/Login";
import Home from "./components/main/Home";
import PageNotFound from "./components/main/PageNotFound";

import UserHome from "./components/user/UserHome";
import NewLocation from "./components/user/NewLocation";

function App() {
    const [userContext, setUserContext] = useContext(UserContext);
    // const [user, setUser] = useState(null);

    // const verifyUser = useCallback(() => {
    //     fetch(process.env.REACT_APP_API_ENDPOINT + "refreshToken", {
    //         method: "POST",
    //         credentials: "include",
    //         headers: { "Content-Type": "application/json" },
    //     }).then(async (response) => {
    //         if (response.ok) {
    //             const data = await response.json();
    //             setUserContext((oldValues) => {
    //                 return { ...oldValues, token: data.token };
    //             });
    //             console.log("siema")
    //         } else {
    //             setUserContext((oldValues) => {
    //                 return { ...oldValues, token: null };
    //             });
    //             console.log("siema")
    //         }
    //         // call refreshToken every 5 minutes to renew the authentication token.
    //         setTimeout(verifyUser, 5 * 60 * 1000);
    //     });

    // }, [setUserContext]);

    // useEffect(() => {
    //     verifyUser();
    // }, [verifyUser]);

    function RequireAuth({ children, redirectTo }) {
        if (userContext.token) {
            return children;
        }
        return <Navigate to={redirectTo} />;
    }

    const logoutHandler = () => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "logout", {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userContext.token}`,
            },
        }).then(async (response) => {
            setUserContext((oldValues) => {
                return { ...oldValues, details: undefined, token: null };
            });
            window.localStorage.setItem("logout", Date.now());
        });
    };

    const syncLogout = useCallback((event) => {
        if (event.key === "logout") {
            // If using react-router-dom, you may call history.push("/")
            window.location.reload();
        }
    }, []);

    useEffect(() => {
        window.addEventListener("storage", syncLogout);
        return () => {
            window.removeEventListener("storage", syncLogout);
        };
    }, [syncLogout]);

    return (
        <Router>
            <Navbar logoutHandler={logoutHandler}/>
            <Routes>
                {/* <Navbar /> */}
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/user/home"
                    element={
                        <RequireAuth redirectTo="/login">
                            <UserHome />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/user/newLocation"
                    element={
                        <RequireAuth redirectTo="/login">
                            <NewLocation />
                        </RequireAuth>
                    }
                />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </Router>
    );  
}

export default App;
