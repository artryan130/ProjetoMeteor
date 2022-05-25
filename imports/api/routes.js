import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import React from 'react';
import {App} from '../ui/App'
import  {LoginForm}  from "../ui/LoginForm";
import TodoList from "../ui/TodoList"; 
import {InsertTask} from '../ui/InsertTask'
import { Meteor } from 'meteor/meteor';
import {render} from 'react-dom';

Meteor.startup(() => {
    render(<Router>
            <Switch>
                <Route path ='/todo' component={TodoList} />
                <Route path="/login" component={LoginForm} />
                <Route path='/insert' component={InsertTask} />
                <Route exact path="/" component={App} />
            </Switch>
    </Router>, document.getElementById('react-target'));
});
