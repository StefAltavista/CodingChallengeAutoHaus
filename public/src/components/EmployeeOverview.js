import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../globalState/context";
import AddressRender from "./AddressRender";

export default function EmployeeOverview({ userid }) {
    const { globalState } = useContext(GlobalContext);
    const [employee, setEmployee] = useState(null);
    let m = "No data";
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
            setEmployee(globalState.userData);
        }
    }, [globalState.userData]);
    return (
        <>
            {employee && (
                <div id="employeeOverview">
                    <div id="header">
                        <h1>
                            {employee.firstname} {employee.lastname}
                        </h1>
                        <h3>{employee.role || m}</h3>
                    </div>
                    <div>
                        <p>Username: {employee.username || m} </p>
                        <p>E-mail: {employee.email} </p>

                        <p>Address: </p>
                        <AddressRender
                            user={employee}
                            field={"address"}
                        ></AddressRender>
                    </div>
                </div>
            )}
        </>
    );
}
