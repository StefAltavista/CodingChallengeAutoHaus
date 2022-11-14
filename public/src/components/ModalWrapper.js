import React from "react";

export default function ModalWrapper({ children, close, id }) {
    return (
        <div id="modalBackground">
            <div id={id}>
                <p id="close" onClick={() => close()}>
                    X
                </p>
                {children}
            </div>
        </div>
    );
}
