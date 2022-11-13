import React, { useState, useContext } from "react";

export default function Authenticate({ type, checkAuth }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState();

    const enter = async () => {
        fetch(`/api/${type}`, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ email, password }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    if (res.error == "Email already in use") {
                        setResponse(res.error);
                    } else if (res.error == "parameter missing") {
                        setResponse(
                            "You need to provide both Email and Password"
                        );
                    } else
                        setResponse(
                            "Ops! Something went wrong, please try again"
                        );
                } else if (res.success) {
                    checkAuth();
                } else {
                    setResponse("Ops! Something went wrong, please try again");
                }
            });

        return;
    };
    return (
        <div id="authenticate">
            <div>
                <p>Email</p>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
            </div>
            <div>
                <p>Password</p>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
            </div>
            <button onClick={enter}>{type.toUpperCase()}</button>
            {response && <p>{response}</p>}
        </div>
    );
}
