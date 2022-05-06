import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from 'react';
import {App}  from './App'
import  {LoginForm}  from "./LoginForm";
 
export const renderRoutes = () => {
     return (   
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            {/* <Route exact path="/login" component={LoginForm} /> */}
        </Switch>
        </BrowserRouter>
    ) 
};