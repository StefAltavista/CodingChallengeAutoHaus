import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import EmployeeOverview from "./EmployeeOverview";
import useSetUser from "../hooks/useSetUser";
import Banner from "./Banner";
import Expired from "./Expired";

export default function App({ token }) {
    const [session, setSession] = useState(true);
    useSetUser(token);

    setTimeout(() => {
        setSession(false);
    }, 1000 * 60 * 30);

    return (
        <>
            <BrowserRouter>
                {session ? (
                    <>
                        <Banner></Banner>
                        <Routes>
                            <Route exact path="/" element={<Home></Home>} />
                            <Route
                                exact
                                path="/profile"
                                element={
                                    <EmployeeOverview
                                        userid={null}
                                    ></EmployeeOverview>
                                }
                            />
                        </Routes>
                    </>
                ) : (
                    <Expired></Expired>
                )}
            </BrowserRouter>
        </>
    );
}
