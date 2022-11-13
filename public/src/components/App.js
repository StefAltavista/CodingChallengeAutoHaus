import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalContext } from "../globalState/context";
import Home from "./Home";
import getUser from "../hooks/getUser";

export default function App({ token }) {
    const { dispatch } = useContext(GlobalContext);
    getUser(token);

    // useEffect(() => {
    //     dispatch({ type: "SET_TOKEN", payload: token });
    // }, []);

    return (
        <>
            {
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Home></Home>} />
                    </Routes>
                </BrowserRouter>
            }
        </>
    );
}
