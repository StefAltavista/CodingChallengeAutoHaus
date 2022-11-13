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

        default:
            return { ...state };
    }
}
