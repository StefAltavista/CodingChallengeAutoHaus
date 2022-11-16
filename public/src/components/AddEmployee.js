import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import AddManually from "./AddManually";
import AddCsv from "./AddCsv";

export default function AddEmployee({ closeModal }) {
    const [manual, setMan] = useState(false);
    const [auto, setAuto] = useState(false);

    return (
        <ModalWrapper id="addEmployeeModal" close={closeModal}>
            <h1>Register new employee</h1>

            {!manual && !auto && (
                <div id="addEmployeeType">
                    <div
                        onClick={() => {
                            setMan(!manual);
                        }}
                    >
                        Add Employee Manually
                    </div>
                    <div onClick={() => setAuto(!auto)}>Add CSV List</div>
                </div>
            )}

            {manual && (
                <AddManually
                    closeModal={closeModal}
                    addNew={() => setMan(false)}
                ></AddManually>
            )}
            {auto && (
                <AddCsv
                    closeModal={closeModal}
                    addNew={() => setMan(false)}
                ></AddCsv>
            )}
        </ModalWrapper>
    );
}
