import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from 'react';
import { App } from './App'
import { LoginForm } from "./LoginForm";
 
export const renderRoutes = () => {
     return (   
        <BrowserRouter>
        <div>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={LoginForm} />
        </Switch>
        </div>
        </BrowserRouter>
    ) 
};