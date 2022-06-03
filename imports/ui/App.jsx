import React, { Fragment, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import  { LoginForm } from './LoginForm';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { TasksCollection } from '../db/TasksCollection';


export const App = (props) => {
  const logout = () => Meteor.logout();
  const user = useTracker(() => Meteor.user());
  
  const { itens } = useTracker(() => {
    const itens = TasksCollection.find().fetch();
    return {itens};
})

const hideCompletedFilter = { isChecked: { $ne: true} };

  const userFilter = user ? {userId: user._id} : {}

  const pendingOnlyFilter = {...hideCompletedFilter, ...userFilter};

  const totalTasksCount = TasksCollection.find().count();
  const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();
  const concluidTaskCount = totalTasksCount - pendingTasksCount;

  return (
    <Box className="main">
        {user ? 
          (
            <Fragment>
              <Box className='app-content'>
                <Box className='Title'>
                  <h1>Seja bem vindo ao nosso sistema To do List {user.username}!</h1>
                  <h2>Gostaria de ir para as tarefas?</h2>
                </Box>

                <Box className='box-view'>
                  <Box className='box-card'>
                    Total de tarefas cadastradas: {totalTasksCount}
                  </Box>

                  <Box className='box-card'>
                    Total de tarefas concluidas: {concluidTaskCount}
                  </Box>
                </Box>

                <Box className='box-view'>
                  <Box className='box-card'>
                    Total de tarefas em aberto: {pendingTasksCount}
                  </Box>

                  <Box className='box-card'>
                    <Link to='/todo'>Acessar todo list</Link>
                  </Box>
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
  
  
