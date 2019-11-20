const initialState = {
    loggedInUser: sessionStorage.getItem('logged-user'),
}

function reducer(state = initialState, action) {
    console.log("reducer:", action);
    switch(action.type) {
        case "SET_LOGGED":
            return {
                ...state,
                loggedInUser: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;