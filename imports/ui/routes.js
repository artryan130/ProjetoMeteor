import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import React from 'react';
import {App} from './App'
import {LoginForm}  from "./LoginForm";
import TodoList from "./TodoList"; 
import {InsertTask} from './InsertTask'
import { Meteor } from 'meteor/meteor';
import {render} from 'react-dom';
import {EditTask} from './EditTask'
import {RegisterForm} from './RegisterForm'
import {ProfileForm} from './ProfileForm'

Meteor.startup(() => {
    render(<Router>
            <Switch>
                <Route path ='/todo' component={TodoList} />
                <Route path="/login" component={LoginForm} />
                <Route path='/insert' component={InsertTask} />
                <Route path='/edit' component={EditTask} />
                <Route path='/register' component={RegisterForm} />
                <Route path='/profile' component={ProfileForm} />
                <Route exact path="/" component={App} />
            </Switch>
    </Router>, document.getElementById('react-target'));
});
