var initialState = {
    data: null
};

const CartReducer = (state = initialState, action) => {
    var { type, payload } = action;


    switch (type) {
        case "ADDTOCART":
            return {
                ...state,
                data: payload
            };
        case "CLEARCART":
            return {
                ...state,
                data: payload
            }


        default:
            return state;
    }

}

export default CartReducer;