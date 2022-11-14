import React from "react";

export default function Expired() {
    const clearSession = () => {
        fetch("/api/logOut")
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    window.location.reload();
                }
            });
    };

    return (
        <div id="modalBackground" onClick={clearSession}>
            <div>
                <p>Session expired</p>
            </div>
        </div>
    );
}
