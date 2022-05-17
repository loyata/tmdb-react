import React, {useEffect} from 'react';
import {Paper, Typography, CircularProgress, Divider} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {useParams, useHistory} from "react-router-dom";
import {getPost, fetchPostsFromSearch} from "../../redux/action-creators/posts.js";
import useStyles from './styles.js'
import Comment from "./Comment/Comment";


const PostDetails = () => {
    const {post, posts, isLoading} = useSelector(state => state.posts)
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const {id} = useParams();
    useEffect(()=>{
        dispatch(getPost(id));
    },[id])

    useEffect(()=>{
        if(post) {
            dispatch(fetchPostsFromSearch({search:'none', tags:post?.tags.join(',')}));
        }
    },[post])


    if(!post) return null;


    let recommendedPosts = posts.filter(({_id}) => _id !== post._id)
    if(recommendedPosts.length >= 5){
        recommendedPosts = recommendedPosts.slice(0,5);
    }

    const navigateRecommendation = (id) => {
        history.push(`/posts/${id}`)
    }


    return (
        <Paper elevation={3}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                    <Typography variant="h6">Created by: {post.name}</Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Comment post={post}/>
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile} alt={post.title} />
                </div>
            </div>
            {recommendedPosts.length?
                (
                    <div className={classes.section}>
                        <Typography gutterBottom variant={"h5"}>You might also like</Typography>
                        <Divider/>
                        <div className={classes.recommendedPosts} style={{display:"flex", justifyContent:"space-around"}}>
                            {recommendedPosts.map(({title, selectedFile, _id})=>(
                                    <div key={_id} style={{margin:' 20px', cursor:'pointer', display:"flex", flexDirection:"column"}} onClick={()=>{navigateRecommendation(_id)}}>
                                        <img src={selectedFile} alt={"No image"} width={"100px"}/>
                                    </div>
                            ))}
                        </div>
                    </div>
                ):null
            }
        </Paper>
    );
}

export default PostDetails;