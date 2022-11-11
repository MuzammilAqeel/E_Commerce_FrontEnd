var initialState = {
    data: null
};

const LoginReducer = (state = initialState, action) => {
    var { type, payload } = action;


    switch (type) {
        case "LOGIN":
            return {
                ...state,
                data: payload
            };
        case "LOGOUT":
            return {
                ...state,
                data: payload
            }


        default:
            return state;
    }

}

export default LoginReducer;