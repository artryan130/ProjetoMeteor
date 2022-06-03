import React, { Fragment, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import  { LoginForm } from './LoginForm';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

export const App = (props) => {
  const logout = () => Meteor.logout();
  const user = useTracker(() => Meteor.user());
  // const redirect = props.history.push('/')

  return (
    <Box className="main">
        {user ? 
          (
            <Fragment>
              <Box className='app-content'>
                <Box className='Title'>
                  <h1>Seja bem vindo ao nosso sistema To do List!</h1>
                  <h2>Gostaria de ir para as tarefas?</h2>
                </Box>

                <Box className='Link'>
                  <Link to='/todo'>Acessar todo list</Link>
                </Box>
                

                <Box className="Logout" onClick={logout}>
                  {'Logout'} 🚪
                </Box>
              </Box>
              
              </Fragment>
          ) : (
            <LoginForm/>
          ) 
      }
    </Box>
  )
}
  
  
