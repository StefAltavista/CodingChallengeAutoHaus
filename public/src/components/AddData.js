import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../globalState/context";
import AddressForm from "./AddressForm";

export default function AddData({ submitted, user, user_Id, newUser }) {
    const { globalState, dispatch } = useContext(GlobalContext);
    const [step, setStep] = useState(0);
    const [data, setData] = useState();
    const [input, setInput] = useState("");
    const [error, setError] = useState();
    let missingData;
    let url;

    switch (user) {
        case "this":
            missingData = globalState.missingData;
            url = "/api/data";
            break;
        case "newUser":
            missingData = ["role", "username", "address"];
            url = "/api/employeedata";
            break;
    }

    const submit = (x) => {
        fetch(url, {
            headers: {
                "content-type": "application/json",
                Authorization: globalState.token,
                userid: user_Id,
            },
            method: "POST",
            body: JSON.stringify({ ...data, [x]: input }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log("here", res);
                if (res.success) {
                    user == "this"
                        ? dispatch({
                              type: "SET_USER",
                              payload: { userData: { ...data, [x]: input } },
                          })
                        : newUser({ ...data, [x]: input });
                    setStep(0);
                    submitted();
                } else {
                    setError(res.error);
                }
            });
    };

    const next = (x) => {
        setData({ ...data, [x]: input });
        setInput("");
        setStep(step + 1);
    };
    const skip = () => {
        setInput("");
        setStep(step + 1);
    };
    return (
        missingData && (
            <>
                <p>Please add the following informations</p>

                {missingData &&
                    missingData.map((x, idx) => {
                        let length = missingData.length;
                        let title = getTitle(x);
                        let inputField;
                        if (x == "address") {
                            inputField = (
                                <AddressForm
                                    key={idx}
                                    title={title}
                                    input={input}
                                    setInput={setInput}
                                ></AddressForm>
                            );
                        } else {
                            inputField = (
                                <div key={idx}>
                                    <p>{title}</p>
                                    <input
                                        value={input}
                                        type="text"
                                        onChange={({ target }) =>
                                            setInput(target.value)
                                        }
                                    />
                                </div>
                            );
                        }
                        if (step == idx) {
                            return (
                                <div key="commands">
                                    {inputField}
                                    <div>
                                        {step < length - 1 && (
                                            <div id="comands">
                                                <button onClick={() => next(x)}>
                                                    Add
                                                </button>
                                                <button onClick={() => skip()}>
                                                    Skip
                                                </button>
                                            </div>
                                        )}
                                        {step == length - 1 && (
                                            <>
                                                <button
                                                    onClick={() => submit(x)}
                                                >
                                                    Submit
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        } else <></>;
                    })}
            </>
        )
    );
}

const getTitle = (x) => {
    switch (x) {
        case "username":
            return "Choose a Username";
        case "firstname":
            return "First Name";
        case "lastname":
            return "Last Name";
        case "address":
            return "Address";
        case "role":
            return "Role in the company";
        default:
            return "whatever";
    }
};
