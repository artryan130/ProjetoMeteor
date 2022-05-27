import Input from '@mui/material/Input';
import React, {useState} from 'react'
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../db/TasksCollection';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const EditTask = (props) => {

    const location = useLocation();
    
    
    
    
    
    
    
    
    
    
    // const  {iten}  = useTracker(() => {
    //     const iten = TasksCollection.find(props).fetch();
    //     return {iten};
    // })

    const history = useHistory();

    const [task, setTask] = useState('')
    const [taskSubtitle, setTaskSubtitle] = useState('')

    const submit = e => {
        e.preventDefault()
        console.log(task)
        if (!task) return;

        Meteor.call('tasks.edit', task, taskSubtitle, location.state._id)

        setTask("");

        history.push("/todo");

    };



    return (
        <div className='edit-container'>
            <h1>Editar tarefas</h1>

            <form onSubmit={submit} className='edit-form'>
                <Input 
                type='text'
                placeholder='Digite aqui sua tarefa'
                value={location.state.task}
                onChange={e => setTask(e.target.value)}
                />
                <Input 
                type='text'
                placeholder='Digite aqui seu subtitulo'
                defaultValue={location.state.taskSubtitle}
                onChange={e => setTaskSubtitle(e.target.value)}
                />
                <button type='submit'>Editar</button>
            </form>
    </div>
    )
}