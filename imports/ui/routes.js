import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import React from 'react';
import {App} from './App'
import  {LoginForm}  from "./LoginForm";
import { TodoList } from "./TodoList"; 

export const RenderRoutes = () => {
    return (   
        <Router>
            <Switch>
                <Route path ='/todo' component={TodoList} />
                <Route path="/login" component={LoginForm} />
                <Route exact path="/" component={App} />
            </Switch>
        </Router>
    ) 
};