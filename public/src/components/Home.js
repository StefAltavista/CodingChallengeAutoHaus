import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../globalState/context";
import AddData from "./AddData";
import Banner from "./Banner";
import ListEmployees from "./ListEmployees";
import useDataCheck from "../hooks/useDataCheck";

export default function Home() {
    const { globalState, dispatch } = useContext(GlobalContext);
    const [submitted, setSubmitted] = useState(false);
    useDataCheck();

    return (
        <>
            <Banner></Banner>

            {!submitted && globalState.missingData ? (
                <AddData
                    submitted={() => {
                        setSubmitted(true);
                    }}
                />
            ) : (
                <ListEmployees></ListEmployees>
            )}
        </>
    );
}
