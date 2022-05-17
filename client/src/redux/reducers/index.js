import {combineReducers} from "redux"

import postsReducer from "./postsReducer.js";
import authReducer from "./authReducer.js";

const reducers = combineReducers({
    //format   state: stateReducer;
    posts: postsReducer,
    auth: authReducer
});

export default reducers;