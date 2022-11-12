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
                } else if (res.token) {
                    checkAuth();
                } else {
                    setResponse("Ops! Something went wrong, please try again");
                }
            });

        return;
    };
    return (
        <div id="Authenticate">
            <h5>{type.toUpperCase()}</h5>
            <div>
                <p>Email</p>
                <input
                    typle="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
            </div>
            <div>
                <p>Password</p>
                <input
                    typle="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
            </div>
            <button onClick={enter}>Submit</button>
            {response && <p>{response}</p>}
        </div>
    );
}
