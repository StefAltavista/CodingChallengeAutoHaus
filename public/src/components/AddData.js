import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../globalState/context";
import useDataCheck from "../hooks/useDataCheck";

export default function AddData({ submitted }) {
    const { globalState, dispatch } = useContext(GlobalContext);
    const [step, setStep] = useState(0);
    const [data, setData] = useState();
    const [input, setInput] = useState("");
    let missing = useDataCheck();

    const submit = (x) => {
        fetch("/api/data", {
            headers: {
                "content-type": "application/json",
                Authorization: globalState.token,
            },
            method: "POST",
            body: JSON.stringify({ ...data, [x]: input }),
        })
            .then((res) => res.json())
            .then((res) => console.log(res));
        dispatch({ type: "SET_USER", payload: { data } });
        setStep(0);
        submitted();
    };

    const next = (x) => {
        setData({ ...data, [x]: input });
        setInput("");
        setStep(step + 1);
    };

    return (
        missing && (
            <div id="modalBackground">
                <div id="addDataModal">
                    <p id="close" onClick={submitted}>
                        X
                    </p>
                    <p>We need some more information about you</p>

                    {missing &&
                        missing.map((x, idx) => {
                            let length = missing.length;
                            let title = getTitle(x);
                            const field = (
                                <div key={idx}>
                                    <p>{title}</p>
                                    <input
                                        value={input}
                                        type="text"
                                        onChange={({ target }) =>
                                            setInput(target.value)
                                        }
                                    />
                                    {step < length - 1 && (
                                        <button onClick={() => next(x)}>
                                            Next
                                        </button>
                                    )}
                                    {step == length - 1 && (
                                        <>
                                            <button onClick={() => submit(x)}>
                                                Submit
                                            </button>
                                        </>
                                    )}
                                </div>
                            );
                            return step == idx ? field : null;
                        })}
                </div>
            </div>
        )
    );
}

const getTitle = (x) => {
    switch (x) {
        case "username":
            return "Choose your User Name";
        case "firstname":
            return "First Name";
        case "lastname":
            return "Last Name";
        case "address":
            return "Address";
        case "role":
            return "What is your Role in the company?";
        default:
            return "whatever";
    }
};
