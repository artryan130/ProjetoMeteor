import Input from '@mui/material/Input';
import React, {useState} from 'react'
import { Meteor } from 'meteor/meteor';

export const InsertTask = () => {

    const [task, setTask] = useState('')

    const submit = e => {
        e.preventDefault()
        if (!task) return;

        console.log(task)
        Meteor.call('tasks.insert', task)

        setTask("");
    };


    return (
        <form onSubmit={submit}>
            <div>
                <Input 
                type='text'
                placeholder='Digite sua tarefa'
                value={task}
                onChange={e => setTask(e.target.value)}
                />
            </div>
            <div>
                <button type='submit'>Entrar</button>
            </div>
        </form>
    )
}