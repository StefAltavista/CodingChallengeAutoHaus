import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../globalState/context";
import useDataCheck from "../hooks/useDataCheck";

export default function AddData({ submitted }) {
    const { globalState, dispatch } = useContext(GlobalContext);
    const { userData } = globalState;
    const [step, setStep] = useState(0);
    const [username, setUsername] = useState(userData.username);
    const [firstname, setFirstname] = useState(userData.firstname);
    const [lastname, setLastname] = useState(userData.lastname);
    const [address, setAddress] = useState(userData.address);
    const [role, setRole] = useState(userData.role);
    let missing = useDataCheck();

    const submit = () => {
        let data = { username, firstname, lastname, address, role };
        fetch("/api/data", {
            headers: {
                "content-type": "application/json",
                Authorization: globalState.token,
            },
            method: "POST",
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((res) => console.log(res));
        dispatch({ type: "SET_USER", payload: { data } });
        setStep(0);
        submitted();
    };

    const next = () => {
        setStep(step + 1);
    };
    useEffect(() => {
        if (username && step == 0) {
            setStep(1);
        } else if (firstname && lastname && step == 1) {
            setStep(2);
        } else if (address && step == 2) {
            setStep(3);
        } else if (role && step == 3) {
            setStep(4);
        }
    }, [step, username, firstname, lastname, address, role]);

    return (
        missing && (
            <div id="modalBackground">
                <div id="addDataModal">
                    <p id="close" onClick={submitted}>
                        X
                    </p>

                    {step == 0 && "username" in missing ? (
                        <div>
                            <p>Choose your Username</p>
                            <input
                                value={username || ""}
                                type="text"
                                onChange={({ target }) =>
                                    setUsername(target.value)
                                }
                            />
                        </div>
                    ) : (
                        next && <></>
                    )}

                    {step == 1 && ("firstname" || "lastname" in missing) ? (
                        <>
                            <div>
                                <p>First Name</p>
                                <input
                                    value={firstname || ""}
                                    type="text"
                                    onChange={({ target }) =>
                                        setFirstname(target.value)
                                    }
                                />
                            </div>
                            <div>
                                <p>Last Name</p>
                                <input
                                    value={lastname || ""}
                                    type="text"
                                    onChange={({ target }) =>
                                        setLastname(target.value)
                                    }
                                />
                            </div>
                        </>
                    ) : (
                        next && <></>
                    )}
                    {step == 2 && "address" in missing ? (
                        <>
                            <div>
                                <p>Address</p>
                                <input
                                    value={address || ""}
                                    type="text"
                                    onChange={({ target }) =>
                                        setAddress(target.value)
                                    }
                                />
                            </div>
                        </>
                    ) : (
                        next && <></>
                    )}
                    {step == 3 && "role" in missing ? (
                        <>
                            <div>
                                <p>Role</p>
                                <input
                                    value={role || ""}
                                    type="text"
                                    onChange={({ target }) =>
                                        setRole(target.value)
                                    }
                                />
                            </div>
                        </>
                    ) : (
                        next && <></>
                    )}

                    {step < 3 && <button onClick={next}>Next</button>}
                    {step == 3 && (
                        <>
                            <button onClick={submit}>Submit</button>
                        </>
                    )}
                </div>
            </div>
        )
    );
}
