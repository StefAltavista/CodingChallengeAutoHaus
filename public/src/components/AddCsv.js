import React, { useState, useContext, useEffect } from "react";
import constructBody from "../hooks/constructBody";
import Papa from "papaparse";
import { GlobalContext } from "../globalState/context";
import ListEmployees from "./ListEmployees";
import generateReport from "../hooks/generateReport";

export default function ({ closeModal, addNew }) {
    const { globalState } = useContext(GlobalContext);
    const [file, setFile] = useState();
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [report, setReport] = useState();

    useEffect(() => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, {
                header: true,
                encoding: "UTF-8",
            });
            const parsedData = csv?.data;

            setData(constructBody(parsedData));
        };
        reader.readAsText(file);
    }, [file]);

    const upload = async () => {
        console.log("here");
        if (!file) return setError("No file Selected");
        let promises = data.map((employee) => {
            return new Promise((resolve, reject) => {
                fetch(`/api/newemployee`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: globalState.token,
                    },
                    method: "POST",
                    body: JSON.stringify(employee),
                })
                    .then((res) => res.json())
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((e) => reject(e));
            });
        });
        let result = await Promise.all(promises);
        setReport(generateReport(result));
        setFile(null);
        setData(null);
    };
    return (
        <>
            {!report && (
                <>
                    <p>Select a CSV File</p>
                    <input
                        type="file"
                        onChange={({ target }) => {
                            target.files[0].type.includes("csv")
                                ? setFile(target.files[0])
                                : setError("Please select a csv file");
                        }}
                    ></input>
                    <button onClick={upload}> Upload List</button>
                    {data && <ListEmployees list={data}></ListEmployees>}
                    <div id="note">
                        <p>
                            Table field must include Name, Surname and E-mail
                            address
                        </p>
                        <p>*Please notice that the CSV must be UTF-8 encoded</p>
                    </div>
                </>
            )}

            {report && (
                <>
                    <p>{report}</p>
                    <button onClick={addNew}>Add new employee</button>
                    <button onClick={closeModal}>Close</button>
                </>
            )}

            {error && <p>ERROR: {error}</p>}
        </>
    );
}
