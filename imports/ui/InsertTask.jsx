import Input from '@mui/material/Input';
import React, {useState} from 'react'
import { Meteor } from 'meteor/meteor';

export const InsertTask = () => {

    const [task, setTask] = useState('')

    const submit = e => {
        e.preventDefault()
        if (!task) return;

        Meteor.call('tasks.insert', task)

        setTask("");

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
                <button type='submit'>Adicionar</button>
            </form>
    </div>
    )
}