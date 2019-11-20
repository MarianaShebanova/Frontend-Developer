const initialState = {
    loggedInUser: sessionStorage.getItem('logged-user'),
    userID: sessionStorage.getItem('user-id'),
}

function reducer(state = initialState, action) {
    console.log("reducer:", action);
    switch(action.type) {
        case "SET_LOGGED":
            return {
                ...state,
                loggedInUser: action.payload,
            };
        case "SET_ID":
                return {
                    ...state,
                    userID: action.payload,
                };
        default:
            return state;
    }
}

export default reducer;