import { useContext, useEffect } from "react";
import { GlobalContext } from "../globalState/context";
export default async function getUser() {
    const { globalState, dispatch } = useContext(GlobalContext);

    useEffect(() => {
        globalState.token
            ? fetch("/api/user", {
                  headers: { Authorization: globalState.token },
              })
                  .then((res) => res.json())
                  .then((res) => {
                      dispatch({
                          type: "SET_USER",
                          payload: {
                              email: res.email,
                              username: res.username,
                              fistname: res.firstname,
                              lastname: res.lastname,
                              address: res.address,
                              role: res.role,
                          },
                      });
                  })
            : null;
    }, [globalState.token]);
}
