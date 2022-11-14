import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ProfilePage from "./profilePage";
import useSetUser from "../hooks/useSetUser";
import Banner from "./Banner";

export default function App({ token }) {
    useSetUser(token);

    return (
        <>
            {
                <BrowserRouter>
                    <Banner></Banner>
                    <Routes>
                        <Route exact path="/" element={<Home></Home>} />
                        <Route
                            exact
                            path="/profile"
                            element={<ProfilePage></ProfilePage>}
                        />
                    </Routes>
                </BrowserRouter>
            }
        </>
    );
}
