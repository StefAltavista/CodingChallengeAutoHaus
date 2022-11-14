import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../globalState/context";
import RenderAddress from "./addressRender";

export default function ProfilePage() {
    const { globalState } = useContext(GlobalContext);
    const profile = globalState.userData;
    console.log(globalState);
    useEffect(() => {}, [globalState.userData]);

    return (
        <div id="profilePage">
            <div id="header">
                <h1>{profile.username}</h1>
                <h3>{profile.role}</h3>
            </div>
            <div>
                <p>Name: {profile.firstname} </p>
                <p>Surame: {profile.lastname} </p>
                <p>E-mail: {profile.email} </p>
                <div id="address">
                    <p>Address: </p>
                    <RenderAddress
                        user={profile}
                        field={"address"}
                    ></RenderAddress>
                </div>
            </div>
        </div>
    );
}
