const initialState = {
    auth:{
        token: null,
        error: null,
    }
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                auth:{
                    token: action.payload,
                    error: null,
                }
            };
        case "LOGOUT":
            localStorage.removeItem('token');
            return {
                ...state,
                auth:{
                    token: null,
                    error: null,
                }
            };
        default:
            return state;
    }
};

export default authReducer;