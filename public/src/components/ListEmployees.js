import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../globalState/context";

export default function ListEmployees() {
    const { globalState } = useContext(GlobalContext);
    const [employees, setEmployees] = useState();
    let m = "Missing Information";
    let keys = [
        "firstname",
        "lastname",
        "role",
        "username",
        "email",
        "address",
    ];

    useEffect(() => {
        globalState.token
            ? fetch("/api/employees", {
                  headers: { Authorization: globalState.token },
              })
                  .then((res) => res.json())
                  .then((res) => {
                      console.log(res);
                      setEmployees(res);
                  })
            : null;
    }, [globalState.token]);
    return (
        <div id="listComponent">
            <h2>Employees List</h2>
            <div id="listEmployees">
                <div id="listHead">
                    <p>#</p>
                    <p>Name</p>
                    <p>Surname</p>
                    <p>Role</p>
                    <p>Username</p>
                    <p>E-mail</p>
                    <p>Address</p>
                </div>
                <div id="list">
                    {/* to not hard code, could list the keys but would a parsing function */}
                    {employees &&
                        employees.map((x, idx) => {
                            return (
                                <div key={idx} id="listBody">
                                    <p>{idx + 1}</p>

                                    {keys.map((y, idxy) => {
                                        if (y == "address") {
                                            console.log("now");

                                            if (x[y]) {
                                                let addressKeys = Object.keys(
                                                    x[y]
                                                );
                                                return (
                                                    <div
                                                        key={idxy}
                                                        id="address"
                                                    >
                                                        {addressKeys.map(
                                                            (z, idxz) => {
                                                                return (
                                                                    <p
                                                                        key={
                                                                            idxz
                                                                        }
                                                                    >
                                                                        {x[y][
                                                                            z
                                                                        ] || ""}
                                                                    </p>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                );
                                            } else return;
                                        } else if (y == "_id") {
                                            return null;
                                        } else {
                                            console.log(y);
                                            return (
                                                <p key={idxy}>{x[y] || m}</p>
                                            );
                                        }
                                    })}
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
