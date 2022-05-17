const authReducer = (state= {authData: null}, action) => {
    switch (action.type){
        case "AUTH":
            //console.log(action.payload)
            localStorage.setItem("profile", JSON.stringify({...action.payload}));
            return {...state, authData: action.payload};
        case "LOGOUT":
            localStorage.clear();
            return {...state, authData: null};
        default:
            return state;

    }
}

// const authReducer = (state= null, action) => {
//     switch (action.type){
//         case "AUTH":
//             console.log(action.payload)
//             localStorage.setItem("profile", JSON.stringify(action.payload.result));
//             return action.payload.result;
//         case "LOGOUT":
//             localStorage.clear();
//             return null;
//         default:
//             return state;
//
//     }
// }

export default authReducer;