import React, { useState, use } from "react";
import { Link } from "react-router-dom";
import LogOut from "./LogOut";
import AddEmployee from "./AddEmployee";
export default function Banner() {
    const [addEmployee, setAddEmployee] = useState(false);
    return (
        <>
            <div id="banner">
                <Link to="/">
                    <p>Home</p>
                </Link>
                <div id="comands">
                    <div onClick={() => setAddEmployee(true)}>
                        <p>Add Employee</p>
                    </div>
                    <div>
                        <Link to="/profile">
                            <p>Profile</p>
                        </Link>
                    </div>
                    <div>
                        <LogOut></LogOut>
                    </div>
                </div>
            </div>
            {addEmployee && (
                <AddEmployee closeModal={() => setAddEmployee(false)} />
            )}
        </>
    );
}
