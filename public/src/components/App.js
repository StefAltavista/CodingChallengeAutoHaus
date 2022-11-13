import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalContext } from "../globalState/context";
import Home from "./Home";
import useSetUser from "../hooks/useSetUser";

export default function App({ token }) {
    const { dispatch } = useContext(GlobalContext);
    useSetUser(token);

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
