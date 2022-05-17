import React, {useState}  from 'react';
import FlashMessage from 'react-flash-message'
import {Avatar, Button, Paper, Grid, Typography, Container, TextField, Box} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"


import {GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {signin, signup} from "../../redux/action-creators/auth"


import useStyles from './styles.js'
import Input from "./Input/Input"
import Icon from "./Icon"
import "./test.css"
import jwtDecode from "jwt-decode";

const Auth = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setSignup] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName:'',
        email:'',
        password: '',
        confirmPassword:''
    })



    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData);
        // console.log(isSignup);
        if(isSignup){
            dispatch(signup(formData, history));
        }else {
            dispatch(signin(formData, history));
        }

    }
    const handleChange = (e) => {
        //console.log(e.target.name);
        setFormData({...formData, [e.target.name]:e.target.value})
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const switchMode = () => {
        setSignup(!isSignup);
    }

    const handleCredential = (credentialResponse) => {

        const result = jwtDecode(credentialResponse.credential);
        const token = credentialResponse.credential;

        try{
            dispatch({type: "AUTH", payload: {result, token}});

            history.push('/');
        }catch (err){
            console.log(err);
        }
    }
    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
        onError: err => console.log(err)
    });


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">{isSignup?'Sign up':'Log in'}</Typography>
                <form className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name={"firstName"} label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name={"lastName"} label="Last Name" handleChange={handleChange} autoFocus half />
                                </>
                            )
                        }
                        <Input name={"email"} label={"Email Address"} handleChange={handleChange} type="email"/>
                        <Input name={"password"} label={"Password"} handleChange={handleChange} type={showPassword? "text":"password"} handleShowPassword={handleShowPassword}/>
                        {
                            isSignup && (
                                <>
                                    <Input name={"confirmPassword"} label={"Confirm Password"} handleChange={handleChange} type={"password"} />
                                </>
                            )
                        }

                    </Grid>
                    <Box display={"flex"} justifyContent={"start"} marginTop={2}>
                        <GoogleLogin
                            onSuccess={handleCredential}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </Box>
                    {/*<Button onClick={() => login()}>*/}
                    {/*    Customized google*/}
                    {/*</Button>*/}
                    <Button type={"submit"} fullWidth variant={"contained"} color={"primary"} className={classes.submit}>
                        {isSignup? 'Sign Up':'Sign In'}
                    </Button>




                    <Grid container justifyContent={"flex-end"}>
                        <Grid item>
                            <Button onClick={switchMode}>
                                <Typography variant={"body2"} style={{textDecoration:"underline"}}>
                                    {isSignup ? 'Already have an account? Sign in': "Don't have an account? Sign up"}
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>

    );
}

export default Auth;