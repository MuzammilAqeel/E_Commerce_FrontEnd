export const addToCart = (body, dispatch) => {
    try {
        return dispatch({
            type: "ADDTOCART",
            payload: body
        })
    } catch (error) {
        console.log(error)
    }
}

export const clearCart = (dispatch) => {
    try {
        return dispatch({
            type: "CLEARCART",
            payload: null
        })
    } catch (error) {
        console.log(error)
    }
}