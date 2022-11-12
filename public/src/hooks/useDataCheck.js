import { useEffect, useContext } from "react";
import { GlobalContext } from "../globalState/context";

export default function useDataCheck(globalState) {
    const { userName, fistName, lastName, address, role } = globalState;
    return !userName || !fistName || !lastName || !address || !role;
}
