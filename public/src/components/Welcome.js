import React, { useEffect, useState, useRef } from "react";
import Authenticate from "./Authenticate";
import Expired from "./Expired";
import { gsap } from "gsap";

export default function Welcome({ status, checkAuth }) {
    const [authType, setAuthType] = useState("logIn");
    const [expired, setExpired] = useState("");
    const welcomeHeader = useRef();
    useEffect(() => {
        gsap.fromTo(
            welcomeHeader.current,
            { opacity: "0" },
            { opacity: "1", duration: 4, delay: 1 }
        );
        setExpired(status.error == "Session expired" ? true : false);
    }, []);

    return (
        <div id="welcome">
            {expired ? (
                <Expired />
            ) : (
                <>
                    <div id="welcomeHeader" ref={welcomeHeader}>
                        <h2>Welcome to Memberteam</h2>
                        <p>Employees Managment System</p>
                    </div>
                    <div id="authFolder" className={authType}>
                        <div id="authType">
                            {authType == "signIn" && (
                                <p
                                    onClick={() => setAuthType("logIn")}
                                    className={"logIn"}
                                >
                                    Log In
                                </p>
                            )}
                            {authType == "logIn" && (
                                <p
                                    onClick={() => setAuthType("signIn")}
                                    className={"signIn"}
                                >
                                    Register
                                </p>
                            )}
                        </div>

                        <Authenticate type={authType} checkAuth={checkAuth} />
                    </div>
                </>
            )}
        </div>
    );
}
