import React, { createContext, useReducer } from "react";
import globalReducer from "./reducer";

export const GlobalContext = createContext();

const initialState = {};

export function GlobalProvider({ children }) {
    const [state, dispatch] = useReducer(globalReducer, initialState);

    return (
        <GlobalContext value={{ state, dispatch }}>{children}</GlobalContext>
    );
}
