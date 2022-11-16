import React, { useState, useContext } from "react";
import { GlobalContext } from "../globalState/context";
import AddData from "./AddData.js";
import ModalWrapper from "./ModalWrapper";
export default function AddEmployee({ closeModal }) {
    const { globalState } = useContext(GlobalContext);
    const [data, setData] = useState();
    const [step, setStep] = useState(0);
    const [response, setResponse] = useState();
    const [newUserId, setNewUserId] = useState();

    const register = () => {
        fetch(`/api/newemployee`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: globalState.token,
            },
            method: "POST",
            body: JSON.stringify({
                ...data,
                password: data.firstname + data.lastname,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if (res.error) {
                    if (res.error == "Email already in use") {
                        setResponse(res.error);
                    } else if (res.error == "parameter missing") {
                        setResponse("Please add an email address");
                    } else
                        setResponse(
                            "Ops! Something went wrong, please try again"
                        );
                } else if (res.success) {
                    setData({
                        ...data,
                        password: data.firstname + data.lastname,
                    });
                    setNewUserId(res.success._id);
                    setStep(step + 1);
                } else {
                    setResponse("Ops! Something went wrong, please try again");
                }
            });
    };

    return (
        <ModalWrapper id="addEmployeeModal" close={closeModal}>
            <h1>Register new employee</h1>
            {step == 0 && (
                <div id="addEmployeeType">
                    <div onClick={() => setStep(1)}>Add Employee Manually</div>
                    <div>Add CSV List</div>
                </div>
            )}
            {step == 1 && (
                <div>
                    <>
                        <p>Name</p>
                        <input
                            type="text"
                            onChange={({ target }) =>
                                setData({
                                    ...data,
                                    firstname: target.value,
                                })
                            }
                        ></input>
                    </>
                    <>
                        <p>Surname</p>
                        <input
                            type="text"
                            onChange={({ target }) =>
                                setData({ ...data, lastname: target.value })
                            }
                        ></input>
                    </>
                    <div>
                        <p>E-mail</p>
                        <input
                            type="email"
                            onChange={({ target }) =>
                                setData({ ...data, email: target.value })
                            }
                        ></input>
                    </div>
                    <button onClick={register}>Register</button>
                    {response && <p>{response}</p>}
                </div>
            )}
            {step == 2 && (
                <AddData
                    user_Id={newUserId}
                    submitted={() => setStep(step + 1)}
                    user="newUser"
                    newUser={(x) => setData({ ...data, ...x })}
                ></AddData>
            )}
            {step == 3 && (
                <>
                    <p>New user successfully added</p>
                    <p>
                        We sent an email to {data.email} with the access
                        password
                    </p>{" "}
                    {/* not implemented*/}
                    <p>Name: {data.firstname}</p>
                    <p>Surname: {data.lastname}</p>
                    <p>Username: {data.username}</p>
                    <p>E-Mail: {data.email}</p>
                    <p>Role: {data.role}</p>
                    <p>Password: {data.password}</p>
                    <button onClick={() => setStep(1)}>Change Info</button>
                    <button
                        onClick={() => {
                            setData({});
                            setStep(0);
                        }}
                    >
                        New employee
                    </button>
                    <button onClick={close}>close</button>
                </>
            )}
        </ModalWrapper>
    );
}
