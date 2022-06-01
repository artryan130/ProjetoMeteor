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
                <div className='insert-label'>
                    <label>
                        Nome:
                    </label>
                    <Input 
                    type='text'
                    placeholder='Digite aqui sua tarefa'
                    value={task}
                    onChange={e => setTask(e.target.value)}
                    />
                </div>

                <div className='insert-label'>
                    <label>
                        Descrição:
                    </label>
                <Input 
                type='text'
                placeholder='Digite aqui seu subtitulo'
                value={taskSubtitle}
                onChange={e => setTaskSubtitle(e.target.value)}
                />
                </div>

                <div className='edit-buttons'>
                    <button type='submit'>Adicionar</button>
                    <button onClick={() => history.push('/todo')}>Cancelar</button>
                </div>
            </form>
    </div>
    )
}