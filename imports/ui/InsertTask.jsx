import Input from '@mui/material/Input';
import React, {useState} from 'react'
import { Meteor } from 'meteor/meteor';
import { useHistory } from "react-router-dom";
import { Box } from '@mui/material'; 
import { FormLabel } from '@mui/material';

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
        <Box className='insert-container'>
            <h1>Adicionar Tarefas</h1>

            <form onSubmit={submit} className='insert-form'>
                <Box className='insert-label'>
                    <FormLabel>
                        Nome:
                    </FormLabel>
                    <Input 
                    type='text'
                    placeholder='Digite aqui sua tarefa'
                    value={task}
                    onChange={e => setTask(e.target.value)}
                    />
                </Box>

                <Box className='insert-label'>
                    <FormLabel>
                        Descrição:
                    </FormLabel>
                <Input 
                type='text'
                placeholder='Digite aqui seu subtitulo'
                value={taskSubtitle}
                onChange={e => setTaskSubtitle(e.target.value)}
                />
                </Box>

                <Box className='edit-buttons'>
                    <button type='submit'>Adicionar</button>
                    <button onClick={() => history.push('/todo')}>Cancelar</button>
                </Box>
            </form>
    </Box>
    )
}