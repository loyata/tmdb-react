import React, {useState, useRef} from 'react';
import {Typography, TextField, Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {commentPost} from '../../../redux/action-creators/posts'

import useStyles from './styles.js'

const Comment = ({post}) => {

    const classes = useStyles();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post.comments)
    const dispatch = useDispatch();
    const commentRef = useRef();
    const user = JSON.parse(localStorage.getItem('profile'));
    const handleClick = async () => {
        const finalComment = `${user.result.name}:${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments);
        setComment('');
        //console.log(commentRef.current);
        commentRef.current.scrollIntoView({behavior:"smooth"});
    }
    //console.log(comments);

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant={"h6"}>Comments</Typography>
                    {
                        comments.map((c,i)=>(
                            c!=null &&
                            <Typography key={i} gutterBottom variant={"subtitle1"}>
                                <strong>{c.split(':')[0]}</strong>&nbsp;
                                {c.split(':')[1]}
                            </Typography>
                        ))
                    }
                    <div ref={commentRef}/>
                </div>
                {user && (
                    <div style={{width:"70%"}}>
                    <Typography gutterBottom variant={"h6"}>Write a Comment</Typography>
                    <TextField fullWidth multiline minRows={4} variant={"outlined"} label={"comment"} value={comment}
                               onChange={(e)=>setComment(e.target.value)}
                    />
                    <Button style={{marginTop:'10px'}} fullWidth disabled={!comment} color={"secondary"} variant={"contained"} onClick={handleClick}>
                        Submit
                    </Button>
                </div>)}

            </div>
        </div>
    );
}

export default Comment;