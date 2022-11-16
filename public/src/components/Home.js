import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../globalState/context";
import AddData from "./AddData";
import ListEmployees from "./ListEmployees";
import useDataCheck from "../hooks/useDataCheck";
import ModalWrapper from "./ModalWrapper";

export default function Home() {
    const { globalState } = useContext(GlobalContext);
    const [submitted, setSubmitted] = useState(false);
    const check = useDataCheck();

    useEffect(() => {
        check();
    }, [globalState.userData]);

    return (
        <>
            {!submitted && globalState.missingData ? (
                <ModalWrapper
                    id="addDataModal"
                    close={() => setSubmitted(true)}
                >
                    <AddData
                        user="this"
                        submitted={() => {
                            setSubmitted(true);
                        }}
                    />
                </ModalWrapper>
            ) : (
                <ListEmployees></ListEmployees>
            )}
            {submitted && globalState.missingData ? (
                <div id="completeProfile" onClick={() => setSubmitted(false)}>
                    <p>Complete your profile</p>
                </div>
            ) : null}
        </>
    );
}
