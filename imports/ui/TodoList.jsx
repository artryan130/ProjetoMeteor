import React from 'react'
import SingleCard from './SingleCard'
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../db/TasksCollection';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Box } from '@mui/material';

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id)
const editTask = ({ task, taskSubtitle, _id }) => Meteor.call('tasks.edit', task, taskSubtitle, _id)

export default function TodoList() {  
  
    const { itens } = useTracker(() => {
        const handler = Meteor.subscribe('tasks');
        const itens = TasksCollection.find().fetch();
        return {itens};
    })


    const generateList = () => {
        // return itens.map((e,index) => SingleCard(e, index))
        return itens.map(itens => <SingleCard  key={itens._id} iten={itens} task={ itens.task }  taskSubtitle={ itens.taskSubtitle } onDeleteClick={deleteTask} onEditClick={editTask}/>)
    }
  
    return (
        <Box>
            <Box className='list'>
                <h1>Tarefas Cadastradas</h1>
                <Box className='item'>{generateList()}</Box>
            </Box>

            <Box className='add'>
                <Link to='/insert'>
                    <AddCircleOutlineIcon sx={{ 
                        color: 'green', 
                        fontSize: 50, 
                        right: '40px', 
                        position: 'absolute'}}
                    />
                </Link>
            </Box>
        </Box>
        
        
    )
}
