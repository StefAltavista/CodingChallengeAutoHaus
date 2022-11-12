import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../globalState/context";

export default function AddData() {
    const { globalState, dispatch } = useContext(GlobalContext);
    const [userName, setUserName] = useState();
    const [fistName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [address, setAddress] = useState();
    const [role, setRole] = useState();

    const submit = () => {
        let data = { fistName, lastName, address, role };
        dispatch({ type: "SET_USER", payload: data });
    };

    return (
        <>
            <div>
                <p>First Name</p>
                <input
                    type="text"
                    onChange={({ target }) => setFirstName(target.value)}
                />
            </div>
            <div>
                <p>Last Name</p>
                <input
                    type="text"
                    onChange={({ target }) => setLastName(target.value)}
                />
            </div>

            <div>
                <p>Address</p>
                <input
                    type="text"
                    onChange={({ target }) => setAddress(target.value)}
                />
            </div>
            <div>
                <p>Role</p>
                <input
                    type="text"
                    onChange={({ target }) => setRole(target.value)}
                />
            </div>

            <button onClick={submit}>Submit</button>
        </>
    );
}
