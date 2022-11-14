import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../globalState/context";
import RenderAddress from "./addressRender";

export default function ListEmployees() {
    const { globalState } = useContext(GlobalContext);
    const [employees, setEmployees] = useState();
    let m = "Missing";
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
                {/* to not hard code, could list the keys but would need a parsing function */}
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
                    {employees &&
                        employees.map((x, idx) => {
                            return (
                                <div key={idx} id="row">
                                    <p>{idx + 1}</p>

                                    {keys.map((y, idxy) => {
                                        if (y == "address") {
                                            return (
                                                <RenderAddress
                                                    row={x}
                                                    field={y}
                                                    index={idxy}
                                                    key={idxy}
                                                ></RenderAddress>
                                            );
                                        } else if (y == "_id") {
                                            return null;
                                        } else {
                                            return (
                                                <div key={idxy}>
                                                    <p>{x[y] || m}</p>
                                                </div>
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
