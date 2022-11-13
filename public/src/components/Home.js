import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../globalState/context";
import AddData from "./AddData";
import Banner from "./Banner";

export default function Home() {
    const { globalState, dispatch } = useContext(GlobalContext);
    const [submitted, setSubmitted] = useState(false);

    return (
        <>
            <Banner></Banner>

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
