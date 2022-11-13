import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../globalState/context";
import AddData from "./AddData";

export default function Home() {
    const { globalState, dispatch } = useContext(GlobalContext);
    const [submitted, setSubmitted] = useState(false);

    return (
        <>
            <div id="header">
                <p>Home</p>
                <div>
                    <p>Profile</p>
                    <p>Log Out</p>
                </div>
            </div>

            {!submitted && globalState.userData && (
                <AddData
                    submitted={() => {
                        setSubmitted(true);
                    }}
                />
            )}
        </>
    );
}
