import Input from '@mui/material/Input';
import React, {useState} from 'react'
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../db/TasksCollection';
import { useHistory } from "react-router-dom";

export const EditTask = (props) => {

    const  {iten}  = useTracker(() => {
        const iten = TasksCollection.find(props).fetch();
        return {iten};
    })

    const history = useHistory();

    const [task, setTask] = useState('')
    const [taskSubtitle, setTaskSubtitle] = useState('')

    const submit = e => {
        e.preventDefault()
        if (!task) return;

        Meteor.call('tasks.edit', task, taskSubtitle, iten._id)

        setTask("");

        history.push("/todo");

    };



    return (
        <div className='edit-container'>
            <h1>Adicionar Tarefas</h1>

            <form onSubmit={submit} className='edit-form'>
                <Input 
                type='text'
                placeholder='Digite aqui sua tarefa'
                value={task}
                onChange={e => setTask(e.target.value)}
                defaultValue={iten.task}
                />
                <Input 
                type='text'
                placeholder='Digite aqui seu subtitulo'
                value={taskSubtitle}
                onChange={e => setTaskSubtitle(e.target.value)}
                defaultValue={iten.taskSubtitle}
                />
                <button type='submit'>Adicionar</button>
            </form>
    </div>
    )
}