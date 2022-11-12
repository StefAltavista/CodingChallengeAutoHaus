export default function globalReducer(state, action) {
    switch (action.type) {
        case "logIn":
            return {
                ...state,
                token: action.payload.token,
                email: action.payload.email,
            };
        default:
            break;
    }
}
