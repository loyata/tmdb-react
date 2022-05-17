import React, {useState, useEffect} from 'react';
import useStyles from "./styles.js"
import {Paper, Box, Typography, TextField, Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {createPost, updatePost} from "../../redux/action-creators/posts";
import {useHistory} from "react-router-dom";


import {storage} from "../../firebase.js"
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"





const Form = ({currentId, setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [postData, setPostData] = useState({
        // creator:'',
        title:'',
        message:'',
        tags:'',
        selectedFile:''
    })
    const [imageUpload, setImageUpload] = useState(null);


    const name = JSON.parse(localStorage.getItem("profile"))?.result?.name;
    const history = useHistory();
    const {posts} = useSelector((state) => {
        return state.posts;
    })
    let post = null;
    if(currentId) {
        post = posts.find((p) => {
            return p._id === currentId;
        })
    }

    useEffect(() => {
        if(post) setPostData(post);
    }, [post]);


    const clearSubmit = ()=>{
        setPostData({
        // creator:'',
        title:'',
        message:'',
        tags:'',
        selectedFile:''
    });
        currentId = null;
    }



    const handleSubmit = async (event) => {
        event.preventDefault();
        if(imageUpload !== null) {
            const imageRef = ref(storage, `/images/${imageUpload.name}`);
            await uploadBytes(imageRef, imageUpload);

            getDownloadURL(imageRef).then( async (url)=>{
                if(currentId !== null){
                    dispatch(updatePost(currentId, postData));
                }else{
                    dispatch(createPost({...postData, name, selectedFile: url}, history));
                    clearSubmit();
                }

            }).catch((err)=>{
                console.log(err);
            })
        }



    }


    if(!name){
        return(
            <Paper className={classes.paper}>
                <Typography variant={"h6"}>
                    You need to log in before creating or editing a post!
                </Typography>
            </Paper>
        )
    }



    return (

            <Paper className={classes.paper} elevation={6}>
                <form noValidate autoComplete="off" className={`${classes.form}`} onSubmit={handleSubmit}>
                    <Typography className={classes.spacing} variant="h6">
                        {currentId?'Editing':'Creating'} a Movie
                    </Typography>
                    {/*<TextField className={classes.spacing} name="creator" label="Creator" variant="outlined" fullWidth value={postData.creator} onChange={(event) => {setPostData({...postData, creator: event.target.value});}}/>*/}
                    <TextField className={classes.spacing} name="title" label="Title" variant="outlined" fullWidth value={postData.title} onChange={(event) => {setPostData({...postData, title: event.target.value});}}/>
                    <TextField className={classes.spacing} name="message" label="Message" variant="outlined" multiline minRows={3} maxRows={6} fullWidth value={postData.message} onChange={(event) => {setPostData({...postData, message: event.target.value});}}/>
                    <TextField className={classes.spacing} name="tags" label="Tags" variant="outlined" fullWidth value={postData.tags} onChange={(event) => {setPostData({...postData, tags: event.target.value.split(',')});}}/>

                    <input
                        accept="image/*"
                        className={classes.input}
                        // style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={(event) => {
                            setImageUpload(event.target.files[0]);
                        }}
                    />
                    <Button className={classes.buttonSubmit} fullWidth variant="contained" color="primary" size="large" type="submit">Submit</Button>
                    <Button  variant="contained" fullWidth color="secondary" size="small" onClick={clearSubmit}>Clear</Button>
                </form>
            </Paper>

    );
}

export default Form;