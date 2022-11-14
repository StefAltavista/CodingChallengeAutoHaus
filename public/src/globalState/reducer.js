export default function globalReducer(state, action) {
    switch (action.type) {
        case "SET_TOKEN":
            return { ...state, token: action.payload };

        case "SET_USER":
            return {
                ...state,
                ...action.payload,
            };
        case "LOG_OUT":
            return {};
        case "MISSING_DATA":
            console.log("missingDATA");
            return { ...state, missingData: action.payload };

        default:
            return { ...state };
    }
}
