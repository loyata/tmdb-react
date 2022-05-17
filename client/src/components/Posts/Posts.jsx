import React, {Component} from 'react';
import Post from "./Post/Post";
import useStyles from "./styles.js";

import { useSelector} from "react-redux";

import {Grid, CircularProgress} from "@material-ui/core";

const Posts = ({currentID, setCurrentId}) => {
    const classes = useStyles();
    const {posts, isLoading} = useSelector((state) => {
        return state.posts;
    })

    if(!posts.length && !isLoading) return "No Post";

    return (
        <div>

            {isLoading ? <CircularProgress/> :
                <Grid container alignItems="stretch" spacing={2}>
                    {
                        posts.map((post)=>{
                            return(
                                <Grid item key={post._id} xs={12} sm={12} md={6} lg={4}>
                                    <Post post={post} currentId={currentID} setCurrentId={setCurrentId}/>
                                </Grid>)
                        })
                    }
                </Grid>
            }
        </div>
    );
}

export default Posts;