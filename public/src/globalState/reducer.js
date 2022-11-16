export default function globalReducer(state, action) {
    console.log("reducer action: ", action);

    switch (action.type) {
        case "SET_TOKEN":
            return { ...state, token: action.payload };

        case "SET_USER":
            return {
                ...state,
                userData: { ...state.userData, ...action.payload.userData },
            };
        case "LOG_OUT":
            return {};
        case "MISSING_DATA":
            return { ...state, missingData: action.payload };

        default:
            return { ...state };
    }
}
