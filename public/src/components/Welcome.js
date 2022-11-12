import React, { useState } from "react";
import Authenticate from "./Authenticate";

export default function Welcome({ status, checkAuth }) {
    const [authType, setAuthType] = useState("logIn");
    console.log(status);

    return (
        <div id="welcome">
            <div id="welcomeHeader">
                <h3>Welcome to Memberteam</h3>
                <p>Professional Employees Managment sysntem</p>
            </div>
            <div id="authFolder">
                <div id="authType">
                    <p onClick={() => setAuthType("logIn")}>Log In</p>
                    <p onClick={() => setAuthType("signIn")}>Sign In</p>
                </div>

                <Authenticate type={authType} checkAuth={checkAuth} />
            </div>
        </div>
    );
}
