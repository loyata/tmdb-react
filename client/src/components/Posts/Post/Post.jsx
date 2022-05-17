import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import useStyles from "./styles.js"

import reddit from "../../../images/reddit.jpg"
import moment from 'moment';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    CardActionArea,
    ListItemSecondaryAction,
    Box
} from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import {ThumbUpAltOutlined} from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {useDispatch} from "react-redux";
import {deletePost, likePost} from "../../../redux/action-creators/posts";


const Post = ({post, setCurrentId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem("profile"))?.result;
    const userId = user?.sub || user?._id;

    const [likes, setLikes] = useState(post.likes);

    const handleDelete = () => {
        dispatch(deletePost(post._id));
    }
    const hasLikedPost = post.likes.find((like)=>like === userId)

    const handleLike = async () => {
        dispatch(likePost(post._id));


        if(hasLikedPost){
            setLikes(post.likes.filter((like)=> like !== userId));
        }else{
            setLikes([...likes, userId]);
        }
    }

    const tagsDisplay = () => {
        let res = '';
        for(let tag of post.tags){
            res += ('#' + tag + ' ');
        }
        return res;
    }

    const getDetails = () => history.push(`/posts/${post._id}`)

    const handeLikeNumbers = () => {
        if(hasLikedPost){
            if(likes.length > 2){
                return (<><ThumbUpAltIcon fontSize={"small"}/>&nbsp; You and {likes.length-1} users liked</>);
            }else return (<><ThumbUpAltIcon fontSize={"small"}/>&nbsp; {likes.length} like{likes.length === 2?'s':''}</>);
        }else{
            if(likes.length >= 2) return (<><ThumbUpAltOutlined fontSize={"small"}/>&nbsp; {likes.length} Likes</>);
            else return (<><ThumbUpAltOutlined fontSize={"small"}/>&nbsp; {likes.length} Like</>);
        }


    }

    const classes = useStyles();
        return (
            // <div>
            //     <h1>This is a post</h1>
            // </div>
            <Card className={classes.card} elevation={6} raised  >
                <CardActionArea onClick={getDetails}>
                    <CardMedia className={classes.media}
                               image={post.selectedFile}
                               title={post.title}
                    />


                    <div className={classes.overlay}>
                        <Typography variant="h6">{post.name}</Typography>
                        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                    </div>

                    <div className={classes.details}>
                        <Typography variant="body2" color="textSecondary">{tagsDisplay()}</Typography>
                    </div>

                    <Typography className={classes.title} variant="h5" component="h2">{post.title}</Typography>

                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions}>

                    <Box display={"flex"} alignItems={"center"}>
                        <Button size="small" color="primary" onClick={handleLike} disabled={user===undefined}>
                            {/*{hasLikedPost?*/}
                            {/*    <ThumbUpAltIcon/>*/}
                            {/*    :<ThumbUpAltOutlined/>}&nbsp;*/}
                            {/*Like {post.likes.length}*/}
                            {handeLikeNumbers()}
                        </Button>

                    </Box>




                    <Button style={{color:"blue"}} size="small" onClick={()=>setCurrentId(post._id)}  disabled={(user?.sub || user?.id) !== post.creator}>
                        <MoreHorizIcon/>
                    </Button>

                    <Button size="small" color="secondary" onClick={handleDelete} disabled={(user?.sub || user?.id) !== post.creator}>
                        <DeleteIcon color={"secondary"}>
                            Delete
                        </DeleteIcon>
                    </Button>
                </CardActions>
            </Card>
        );

}

export default Post;