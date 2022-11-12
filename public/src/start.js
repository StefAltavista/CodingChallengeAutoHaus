import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./components/App";
import Welcome from "./components/Welcome";
import { GlobalProvider } from "./globalState/context";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);
let app;
const validate = async () => {
    fetch("/api/validate")
        .then((res) => res.json())
        .then((res) => {
            if (res.token) {
                app = root.render(
                    <GlobalProvider>
                        <App token={res.token} />
                    </GlobalProvider>
                );
            } else root.render(<Welcome status={res} checkAuth={validate} />);
        });
};

validate();
