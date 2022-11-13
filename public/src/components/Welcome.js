import React, { useState } from "react";
import Authenticate from "./Authenticate";

export default function Welcome({ status, checkAuth }) {
    const [authType, setAuthType] = useState("logIn");

    return (
        <div id="welcome">
            <div id="welcomeHeader">
                <h2>Welcome to Memberteam</h2>
                <p>Employees Managment System</p>
            </div>
            <div id="authFolder">
                {status.error == "Session expired" ? (
                    <p>{status.error}</p>
                ) : null}
                <div id="authType">
                    {authType == "signIn" && (
                        <p onClick={() => setAuthType("logIn")}>Log In</p>
                    )}
                    {authType == "logIn" && (
                        <p onClick={() => setAuthType("signIn")}>Register</p>
                    )}
                </div>

                <Authenticate type={authType} checkAuth={checkAuth} />
            </div>
        </div>
    );
}
