import Input from '@mui/material/Input';
import React, {useState} from 'react'
import { Meteor } from 'meteor/meteor';
import { useHistory } from "react-router-dom";

export const InsertTask = () => {

    const history = useHistory();

    const [task, setTask] = useState('')
    const [taskSubtitle, setTaskSubtitle] = useState('')

    const submit = e => {
        e.preventDefault()
        if (!task) return;

        Meteor.call('tasks.insert', task, taskSubtitle)

        setTask("");

        history.push("/todo");

    };


    return (
        <div className='insert-container'>
            <h1>Adicionar Tarefas</h1>

            <form onSubmit={submit} className='insert-form'>
                <Input 
                type='text'
                placeholder='Digite aqui sua tarefa'
                value={task}
                onChange={e => setTask(e.target.value)}
                />
                <Input 
                type='text'
                placeholder='Digite aqui seu subtitulo'
                value={taskSubtitle}
                onChange={e => setTaskSubtitle(e.target.value)}
                />
                <button type='submit'>Adicionar</button>
            </form>
    </div>
    )
}