import React, { createContext, useReducer } from "react";
import globalReducer from "./reducer";

export const GlobalContext = createContext();

const initialState = {};

export function GlobalProvider({ children }) {
    const [globalState, dispatch] = useReducer(globalReducer, initialState);

    return (
        <GlobalContext.Provider value={{ globalState, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}
