import React from "react";
import { Link } from "react-router-dom";
import LogOut from "./LogOut";

export default function Banner() {
    return (
        <div id="banner">
            <Link to="/">
                <p>Home</p>
            </Link>
            <div id="comands">
                <div>
                    <Link to="/">
                        <p>Profile</p>
                    </Link>
                </div>
                <div>
                    <LogOut></LogOut>
                </div>
            </div>
        </div>
    );
}
