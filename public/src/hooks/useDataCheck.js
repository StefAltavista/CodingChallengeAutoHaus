import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../globalState/context";

export default function useDataCheck() {
    const { globalState } = useContext(GlobalContext);

    const [missingData, setMissingData] = useState(false);

    useEffect(() => {
        const { username, firstname, lastname, address, role } =
            globalState.userData;
        if (!username || !firstname || !lastname || !address || !role) {
            let temp = {};
            for (const [key, value] of Object.entries(globalState.userData)) {
                !value ? (temp = { ...temp, [key]: value }) : null;
            }
            setMissingData(temp);
        } else setMissingData(false);
    }, [globalState.userData]);

    return missingData;
}
