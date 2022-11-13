import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../globalState/context";

export default function ListEmployees() {
    const { globalState } = useContext(GlobalContext);
    const [employees, setEmployees] = useState();

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
                            let m = "Missing Information";
                            let keys = Object.keys(x);
                            return (
                                <div key={idx} id="listBody">
                                    <p>{idx + 1}</p>

                                    {keys.map((y, idxy) => {
                                        return y == "_id" ? null : (
                                            <p key={idxy}>{x[y] || m}</p>
                                        );
                                    })}
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
