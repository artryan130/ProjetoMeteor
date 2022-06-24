import React, { Fragment, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import  { LoginForm } from './LoginForm';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { TasksCollection } from '../db/TasksCollection';
import PersistentDrawerLeft from '../ui/components/Drawer'

export const App = (props) => {
  const logout = () => Meteor.logout();
  const user = useTracker(() => Meteor.user());

  const { tasks } = useTracker(() => {
    const noDataAvailable = { tasks: [] };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noDataAvailable};
    }
  
    const tasks = TasksCollection.find().fetch();
    // const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();
    // const totalTasksCount = TasksCollection.count();
    // const concluidTaskCount = totalTasksCount - pendingTasksCount;

    return { tasks };
  });

  const cadastradas = tasks.filter((iten) => iten.situation === 'Cadastrada')

  const cadastradasTasksCount = cadastradas.length

  const andamento = tasks.filter((iten) => iten.situation === 'Em andamento')

  const andamentoTasksCount = andamento.length

  const concluidas = tasks.filter((iten) => iten.situation === 'Concluida')

  const concluidasTasksCount = concluidas.length

  return (
    <Box className="main">
        {user ? 
          (
            <Fragment>
              <Box className='app-content'>
                <PersistentDrawerLeft />
                <Box className='Title'>
                  <h1>Seja bem vindo ao nosso sistema To do List {user.username}!</h1>
                  <h2>Gostaria de ir para as tarefas?</h2>
                </Box>
                
                <Box className='box-view'>
                  <Box className='box-card'>
                    Total de tarefas cadastradas: {cadastradasTasksCount}
                  </Box>

                  <Box className='box-card'>
                    Total de tarefas concluidas: {concluidasTasksCount}
                  </Box>
                </Box>

                <Box className='box-view'>
                  <Box className='box-card'>
                    Total de tarefas em andamento: {andamentoTasksCount}
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
  
  
