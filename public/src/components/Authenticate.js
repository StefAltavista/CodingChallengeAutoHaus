import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Authenticate({ type, checkAuth }) {
    const [response, setResponse] = useState();
    const [data, setData] = useState({});
    const container = useRef();
    useEffect(() => {
        const timeline = gsap.timeline({ defaults: { duration: 1.5 } });
        timeline.fromTo(
            container.current,
            { height: "auto" },
            { height: "auto" }
        );
    }, [type]);

    const enter = async () => {
        fetch(`/api/${type}`, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ ...data }),
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
        <div id="authenticate" ref={container}>
            {type == "logIn" && <h2>Log In</h2>}
            {type == "signIn" && (
                <>
                    <h2>Sign In</h2>
                    <div>
                        <p>Name</p>
                        <input
                            required
                            type="text"
                            value={data.firstname}
                            onChange={(e) =>
                                setData({ ...data, firstname: e.target.value })
                            }
                        ></input>
                    </div>
                    <div>
                        <p>Surname</p>
                        <input
                            required
                            type="text"
                            value={data.lastname}
                            onChange={(e) =>
                                setData({ ...data, lastname: e.target.value })
                            }
                        ></input>
                    </div>
                </>
            )}
            <div>
                <p>Email</p>
                <input
                    required
                    type="email"
                    value={data.email}
                    onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                    }
                ></input>
            </div>
            <div>
                <p>Password</p>
                <input
                    required
                    type="password"
                    value={data.password}
                    onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                    }
                ></input>
            </div>

            <button onClick={enter}>Enter</button>
            {response && <p>{response}</p>}
        </div>
    );
}
