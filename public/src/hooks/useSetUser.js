import { useContext, useEffect } from "react";
import { GlobalContext } from "../globalState/context";
export default async function useSetUser(token) {
    const { dispatch } = useContext(GlobalContext);
    useEffect(() => {
        fetch("/api/user", {
            headers: { Authorization: token },
        })
            .then((res) => res.json())
            .then((res) => {
                dispatch({
                    type: "SET_USER",
                    payload: {
                        token,
                        userData: {
                            email: res.email,
                            username: res.username,
                            firstname: res.firstname,
                            lastname: res.lastname,
                            address: res.address,
                            role: res.role,
                        },
                    },
                });
            });
    }, []);
}
