import React from 'react';
import {Container, createTheme, ThemeProvider} from "@material-ui/core";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home"
import Auth from "./components/Auth/Auth"
import PostDetails from "./components/PostDetails/PostDetails";
import { GoogleOAuthProvider } from '@react-oauth/google';

const theme = createTheme({
  palette: {
    primary: {
      main: '#eb1745',
    },
    secondary: {
      main: '#0044ff',
    },
  },
});

const App = ()=>{

    const user = JSON.parse(localStorage.getItem('profile'))
    return(
        <GoogleOAuthProvider clientId={"999713810681-0n4d9c1sd54blaao55dc7g6tm79tiifr.apps.googleusercontent.com"}>
            <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <Container maxWidth="xl">
                            <Navbar/>
                            <Switch>
                                <Route path="/" exact component={()=>(<Redirect to={"/posts"}/>)}/>
                                <Route path="/posts" exact component={Home}/>
                                <Route path="/posts/search" exact component={Home}/>
                                <Route path="/posts/:id" component={PostDetails}/>
                                <Route path="/auth" exact component={()=>(!user?<Auth/>:<Redirect to={"/posts"}/>)}/>
                            </Switch>
                        </Container>
                    </ThemeProvider>
            </BrowserRouter>
        </GoogleOAuthProvider>


    )
}

export default App;