import React from 'react'
import SingleCard from './SingleCard'
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../db/TasksCollection';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default function TodoList() {
  
    const { itens } = useTracker(() => {
        const handler = Meteor.subscribe('tasks');
        const itens = TasksCollection.find().fetch();
        return {itens};
    })

  const generateList = () => {
    return itens.map((e,index) => SingleCard(e, index))
  }
  
    return (
        <div>
            <div className='list'>
                <h1>Tarefas Cadastradas</h1>
                <div className='item'>{generateList()}</div>
            </div>

            <div className='add'>
                <Link to='/insert'>
                    <AddCircleOutlineIcon sx={{ color: 'green', fontSize: 50, right: '40px', position: 'absolute'}}/>
                </Link>
            </div>
        </div>
        
        
    )
}
