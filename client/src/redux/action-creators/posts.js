import * as api from "../../api"
import {fetchPostsFromQuery} from "../../api";

export const getPosts = (page) => async (dispatch) => {
    try {
        //console.log(page);
        dispatch({type:"START_LOADING"});
        const {data} = await api.fetchPosts(page); //发送get请求
        dispatch({type:"FETCH_ALL", payload: data});
        dispatch({type:"END_LOADING"});
    }catch (error){
        console.log(error.message);
    }
}

export const getPost = id => async (dispatch) => {
    try {
        //console.log(id)
        const {data} = await api.getPost(id);
        //console.log(data);
        dispatch({type: "GET_POST", payload:data})
    }catch (error){
        console.log(error.message);
    }
}

export const createPost = (newPost, history) => async (dispatch) => {
    try {

        const {data} = await api.createPost(newPost);
        dispatch({type: "CREATE", payload:data})
        history.push('/posts')
    }catch (error){
        console.log(error.message);
    }
}

//dispatch(updatePost(currentId, postData));
export const updatePost = (currentId, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(currentId, post);
        dispatch({type: "UPDATE", payload:data})
    }catch (error){
        console.log(error.message);
    }
}

export const deletePost = id => async (dispatch) => {
    try {
        const {data} = await api.deletePost(id);
        dispatch({type:"DELETE", payload:data});

    }catch (e){
        console.log(e.message);
    }
}

export const likePost = id => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);
        dispatch({type: "UPDATE", payload:data})
    }catch (error){
        console.log(error.message);
    }
}

export const fetchPostsFromSearch = query => async (dispatch) => {
    try {
        const {data} = await api.fetchPostsFromQuery(query);
        //console.log(data);
        dispatch({type: "FETCH_BY_SEARCH", payload:data})
    }catch (error){
        console.log(error.message);
    }
}


export const commentPost = (finalComment, id) => async (dispatch) => {
    try{
        //console.log(finalComment, id);
        const {data} = await api.comment(finalComment, id);
        dispatch({type:"COMMENT", payload:data});

        return data.comments;
    }catch (e){
        console.log(e);
    }
}