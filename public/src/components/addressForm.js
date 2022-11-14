import React from "react";
export default function AddressForm({ idx, title, input, setInput }) {
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
                placeholder="Country"
                value={input.country || ""}
                type="text"
                onChange={({ target }) =>
                    setInput({ ...input, country: target.value })
                }
            />
        </div>
    );
}
