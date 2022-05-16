import React, { Fragment, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import  { LoginForm } from './LoginForm';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

export const App = (props) => {
  const logout = () => Meteor.logout();
  const user = useTracker(() => Meteor.user());
  // const redirect = props.history.push('/')

  return (
    <div className="main">
        {user ? 
          (
            <Fragment>

              <div>
                <h1>Seja bem vindo ao nosso sistema To do List!</h1>
                <h2>Gostaria de ir para as tarefas?</h2>
              </div>

            <Link to='/todo'>Acessar todo list</Link>
              {/* 
              <div>
                <button onClick={redirect}/>
              </div> */}

              <div className="user" onClick={logout}>
                {'Logout'} 🚪
              </div>
              </Fragment>
          ) : (
            <LoginForm/>
          ) 
      }
    </div>
  )
}
  
  
