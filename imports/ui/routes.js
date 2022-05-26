import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import React from 'react';
import {App} from './App'
import  {LoginForm}  from "./LoginForm";
import TodoList from "./TodoList"; 
import {InsertTask} from './InsertTask'
import { Meteor } from 'meteor/meteor';
import {render} from 'react-dom';
import {EditTask} from './EditTask'

Meteor.startup(() => {
    render(<Router>
            <Switch>
                <Route path ='/todo' component={TodoList} />
                <Route path="/login" component={LoginForm} />
                <Route path='/insert' component={InsertTask} />
                <Route path='/edit' component={EditTask} />
                <Route exact path="/" component={App} />
            </Switch>
    </Router>, document.getElementById('react-target'));
});
