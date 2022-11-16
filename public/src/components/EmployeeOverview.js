import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../globalState/context";
import RenderAddress from "./addressRender";

export default function EmployeeOverview({ userid }) {
    const { globalState } = useContext(GlobalContext);
    const [employee, setEmployee] = useState(null);
    useEffect(() => {
        if (userid) {
            fetch("/api/employee", {
                headers: { authorization: globalState.token, userid },
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res, "AND", globalState.userData);
                    setEmployee(res);
                });
        } else {
            console.log(globalState.userData);
            setEmployee(globalState.userData);
        }
    }, [globalState.userData]);
    return (
        <>
            {employee && (
                <div id="employeeOverview">
                    <div id="header">
                        <h1>{employee.username || "No UserName"}</h1>
                        <h3>{employee.role || "No Role"}</h3>
                    </div>
                    <div>
                        <p>Name: {employee.firstname} </p>
                        <p>Surame: {employee.lastname} </p>
                        <p>E-mail: {employee.email} </p>
                        <div id="address">
                            <p>Address: </p>
                            <RenderAddress
                                user={employee}
                                field={"address"}
                            ></RenderAddress>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
