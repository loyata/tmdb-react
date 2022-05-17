import * as api from "../../api"

export const signin = (formData, history) => async (dispatch) => {
    try {
        const {data} = await api.signIn(formData);
        //console.log(data);
        dispatch({type: "AUTH", payload: {result: data.existingUser, token:data.token}});
        history.push('/');
    }catch (error){
        console.log(error.message);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const {data} = await api.signUp(formData);
        //console.log(data);
        history.push('/');
    }catch (error){
        console.log(error.message);
    }
}