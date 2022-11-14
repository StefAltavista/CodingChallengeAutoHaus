import React from "react";

export default function RenderAddress({ user }) {
    if (user.address) {
        let addressKeys = Object.keys(user.address);
        return (
            <div id="address">
                {addressKeys.map((z, idxz) => {
                    return <p key={idxz}>{user.address[z] || ""}</p>;
                })}
            </div>
        );
    } else
        return (
            <div id="address">
                <p>Missing</p>
            </div>
        );
}
