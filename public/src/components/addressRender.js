import React from "react";

export default function RenderAddress({ row, field }) {
    if (row[field]) {
        let addressKeys = Object.keys(row[field]);
        return (
            <div id="address">
                {addressKeys.map((z, idxz) => {
                    return <p key={idxz}>{row[field][z] || ""}</p>;
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
