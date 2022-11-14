import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../globalState/context";
import AddData from "./AddData";
import ListEmployees from "./ListEmployees";
import useDataCheck from "../hooks/useDataCheck";
import ModalWrapper from "./ModalWrapper";

export default function Home() {
    const { globalState, dispatch } = useContext(GlobalContext);
    const [submitted, setSubmitted] = useState(false);
    useDataCheck();

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
        </>
    );
}
