import Input from '@mui/material/Input';
import React, {useState, useEffect} from 'react'
import { Meteor } from 'meteor/meteor';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const EditTask = () => {

    const location = useLocation();

    const history = useHistory();

    const [task, setTask] = useState({
    task: '',
    taskSubtitle: '',
    })

    const [edit, setEdit] = useState('false')

    useEffect(() => {
        setTask(location.state)
    }, [])

    const submit = e => {
        e.preventDefault()
        if (!task) return;

        Meteor.call('tasks.edit', task.task, task.taskSubtitle, location.state._id)

        setTask("");

        history.push("/todo");
    };

    const startEdit = e => {
        setEdit('true')
    }

    const handleChange = e => {
        if(e.target.name === 'task'){
            setTask({...task, 
            task: e.target.value
            })
        }else if(e.target.name === 'taskSubtitle') {
            setTask({...task, 
                taskSubtitle: e.target.value
            })
        }else {
            setTask({...task,
                [e.target.name]: e.target.value
            })
        }
    }

    let content = ''
    if(edit === 'false') {
        content = (
            <>
                <div className='edit-container'>
                <h1>Visualização da tarefa</h1>

                <form className='edit-form'>
                    <Input 
                    type='text'
                    name='task'
                    placeholder='Digite aqui sua tarefa'
                    defaultValue={location.state.task}
                    onChange={handleChange}
                    disabled
                    />
                    <Input 
                    type='text'
                    name='taskSubtitle'
                    placeholder='Digite aqui seu subtitulo'
                    defaultValue={location.state.taskSubtitle}
                    onChange={handleChange}
                    disabled
                    />
                </form>
                <button onClick={startEdit}>Editar</button>
                </div>
            </>
        )
    } else {
        content = (
            <>
            <div className='edit-container'>
                <h1>Editação da tarefa</h1>

                <form onSubmit={submit} className='edit-form'>
                    <Input 
                    type='text'
                    name='task'
                    placeholder='Digite aqui sua tarefa'
                    defaultValue={location.state.task}
                    onChange={handleChange}
                    />
                    <Input 
                    type='text'
                    name='taskSubtitle'
                    placeholder='Digite aqui seu subtitulo'
                    defaultValue={location.state.taskSubtitle}
                    onChange={handleChange}
                    />
                    <button type='submit'>Finalizar</button>
                </form>
            </div>
            
            </>
        )
    }

    return (
        <div>
            {content}
        </div>
    )
}