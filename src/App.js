import React, { Component } from "react";
import "./App.css";

import { UserProvider } from "./context/UserContext";
import { UserContext } from "./context/UserContext";

import { BrowserRouter as Router, Routes, Route,useLocation, Navigate } from "react-router-dom";

import Navbar from "./components/partials/Navbar";
import Footer from "./components/partials/Footer";
import Loader from "./components/partials/Loader";

import Register from "./components/main/Register";
import Login from "./components/main/Login";
import Home from "./components/main/Home";
import PageNotFound from "./components/main/PageNotFound";

import UserHome from "./components/user/UserHome";
import { useCallback, useContext, useEffect, useState } from "react";

function App() {
    const [userContext, setUserContext] = useContext(UserContext);

    const verifyUser = useCallback(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "refreshToken", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                setUserContext((oldValues) => {
                    return { ...oldValues, token: data.token };
                });
            } else {
                setUserContext((oldValues) => {
                    return { ...oldValues, token: null };
                });
            }
            // call refreshToken every 5 minutes to renew the authentication token.
            setTimeout(verifyUser, 5 * 60 * 1000);
        });
    }, [setUserContext]);

    useEffect(() => {
        verifyUser();
    }, [verifyUser]);

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
        <UserProvider>
            <Router>
                <Navbar />
                {userContext.token === null ? (
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                ) : userContext.token ? (
                    <UserHome />
                ) : (
                    <Loader />
                )}
                <Footer />
            </Router>
        </UserProvider>
    );
}

function RequireAuth({children}) {
    let auth = useContext(UserContext)
    let location = useLocation();

    console.log(auth)

    if (!auth.user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default App;
