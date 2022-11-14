import React, { useContext } from "react";
import { GlobalContext } from "../globalState/context";

export default function LogOut() {
    const { dispatch } = useContext(GlobalContext);

    const clearSession = () => {
        fetch("/api/logOut")
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if (res.success) {
                    dispatch({ type: "LOG_OUT" });
                    window.location.reload();
                }
            });
    };
    return <p onClick={clearSession}>Log Out</p>;
}
