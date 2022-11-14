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
            {step == 1 && (
                <AddData
                    user_Id={newUserId}
                    submitted={() => setStep(step + 1)}
                    user="newUser"
                ></AddData>
            )}
        </ModalWrapper>
    );
}
