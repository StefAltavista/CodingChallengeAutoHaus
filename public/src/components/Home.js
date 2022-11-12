import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../globalState/context";
import AddData from "./AddData";
import useDataCheck from "../hooks/useDataCheck";

export default function Home() {
    const { globalState, dispatch } = useContext(GlobalContext);

    return (
        <>
            <p>Home</p>

            {useDataCheck && <AddData />}
        </>
    );
}
