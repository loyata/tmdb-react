import React from 'react';
import {Container, Grid, Grow, Paper, AppBar, Button, TextField, Box} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getPosts,fetchPostsFromSearch} from "../../redux/action-creators/posts";
import CustomPagination from "../CustomPagination/CustomPagination";
import {useLocation, useHistory} from "react-router-dom";
import useStyles from "./styles"

const Home = () => {
    const classes = useStyles();
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();
    const history = useHistory();
    const dispatch = useDispatch();

    const page = query.get('page')||1;
    const searchQuery = query.get('searchQuery');

    useEffect(()=>{
        dispatch(getPosts(page));
    }, [page]);

    const [currentId, setCurrentId] = useState(null);

    const handleAdd = (tag) => {
        setTags([...tags, tag]);
    }

    const handleDelete = (tag) => {
        setTags(tags.filter(t => t !== tag));
    }

    const searchPost = () => {
        if(search.trim() || tags){
            //console.log(search, tags);

            dispatch(fetchPostsFromSearch({search, tags: tags.join(',')}))
        }else{
            history.push('/');
        }
    }


    return(
        <Grow in>
            <Container maxWidth={"xl"}>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={2} className={classes.gridContainer}>
                    <Grid item xs={12} sm={12} md={9}>
                        <Posts currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position={"static"} color={"inherit"}>
                            <TextField
                                name={"search"}
                                variant={"outlined"}
                                label={"Search"}
                                fullWidth
                                value = {search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                                onKeyPress={(e)=>{
                                    if(e.keyCode === 13){
                                        ///search post
                                    }
                                }}
                            />
                            <ChipInput
                                style={{margin: "10px 0"}}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label={"Search Tags"}
                                variant={"outlined"}
                            />


                            <Button onClick={searchPost} variant={"outlined"} color={"primary"}>
                                Search
                            </Button>

                        </AppBar>

                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        <Box marginTop={"18px"}>
                            {(!searchQuery) &&
                                (<Paper elevation={6}>
                                    <CustomPagination page={page}/>
                                </Paper>)
                            }

                        </Box>

                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;