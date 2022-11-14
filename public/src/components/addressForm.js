import React from "react";
export default function addressForm({
    x,
    idx,
    title,
    input,
    setInput,
    step,
    length,
    next,
}) {
    return (
        <div key={idx}>
            <p>{title}</p>

            <input
                placeholder="Street"
                value={input.street || ""}
                type="text"
                onChange={({ target }) =>
                    setInput({ ...input, street: target.value })
                }
            />
            <input
                placeholder="Nr."
                value={input.number || ""}
                type="text"
                onChange={({ target }) =>
                    setInput({ ...input, number: target.value })
                }
            />
            <input
                placeholder="Postcode"
                value={input.postcode || ""}
                type="text"
                onChange={({ target }) =>
                    setInput({ ...input, postcode: target.value })
                }
            />
            <input
                placeholder="City"
                value={input.city || ""}
                type="text"
                onChange={({ target }) =>
                    setInput({ ...input, city: target.value })
                }
            />
            <input
                placeholder="Coutry"
                value={input.country || ""}
                type="text"
                onChange={({ target }) =>
                    setInput({ ...input, country: target.value })
                }
            />
            {step < length - 1 && <button onClick={() => next(x)}>Next</button>}
            {step == length - 1 && (
                <>
                    <button onClick={() => submit(x)}>Submit</button>
                </>
            )}
        </div>
    );
}
