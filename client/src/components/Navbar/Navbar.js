import React, {useState, useEffect} from 'react';
import {AppBar, Avatar, Box, Button, Grid, Toolbar, Typography} from "@material-ui/core";
import reddit from "../../images/img_2.png";
import useStyles from "./styles.js";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import {Link} from "react-router-dom";

const Navbar = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));


    useEffect(()=>{
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem("profile")));
    },[useSelector((state) => {
        return state.auth;
    })])

    const logout = () => {
        dispatch({type:"LOGOUT"});
        history.push('/');
        setUser(null);
    }
    return (
        <div>
            <AppBar className={classes.appBar} position="static">
                <Box className={classes.logo} onClick={()=>history.push('/')} style={{cursor:'pointer'}}>
                    <img className={classes.image} src={reddit} alt="memories" width={"100%"} height="41.98"/>
                </Box>
                <Toolbar className={classes.tb}>
                    {user ? (
                        <Box className={classes.profile}>
                            <Box sx={{display:"flex", flexDirection:"row"}}>
                                <Avatar  alt={user.name} src={user.result?.picture}>{}</Avatar>&nbsp;
                                <Typography className={classes.userName} variant="h6">{user.result?.name}</Typography>
                            </Box>
                            <Button variant="contained" onClick={logout} className={classes.logout} color="primary">Log out</Button>
                        </Box>
                    ):(
                        <>
                            <Button className={classes.home} component={Link} to="/posts" variant="contained" color="secondary">
                                Home
                            </Button>
                            &nbsp;&nbsp;
                            <Button className={classes.signin} component={Link} to="/auth" variant="contained" color="primary">
                                Log in
                            </Button>
                        </>
                    )}
                </Toolbar>




            </AppBar>
        </div>
    );
}

export default Navbar;