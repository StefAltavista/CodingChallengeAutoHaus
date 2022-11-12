import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalContext } from "../globalState/context";
import getUser from "../hooks/getUser";
import Home from "./Home";

export default function App({ token }) {
    const { dispatch } = useContext(GlobalContext);
    useEffect(() => {
        dispatch({ type: "SET_TOKEN", payload: token });
    }, []);

    getUser();

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
