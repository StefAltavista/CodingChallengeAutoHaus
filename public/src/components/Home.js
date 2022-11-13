import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../globalState/context";
import AddData from "./AddData";
import Banner from "./Banner";
import ListEmployees from "./ListEmployees";

export default function Home() {
    const { globalState, dispatch } = useContext(GlobalContext);
    const [submitted, setSubmitted] = useState(false);

    return (
        <>
            <Banner></Banner>
            <ListEmployees></ListEmployees>

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
