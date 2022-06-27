import React, {useState} from 'react'
import SingleCard from './SingleCard'
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../db/TasksCollection';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { useHistory } from "react-router-dom";
import TextField from '@mui/material/TextField';

import Pagination from './components/Pagination';

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id)
const editTask = ({ task, taskSubtitle, _id }) => Meteor.call('tasks.edit', task, taskSubtitle, _id)
const situationTask = ({ _id, situation }) => Meteor.call('tasks.setSituation', _id, situation);

const LIMIT = 4;

export default function TodoList() {  

    const [offset, setOffset] = useState(0);

    const user = useTracker(()=> Meteor.user())

    const [hideCompleted, setHideCompleted] = useState(false);

    const hideCompletedFilter = { situation: { $ne: 'Concluida'} };

    const nadaFilter = {}
    const pendingOnlyFilter = {...hideCompletedFilter};

    const [search, setSearch] = useState('')

    const history = useHistory();

    const { itens } = useTracker(() => {
        const noDataAvailable = { itens: []};
        if (!Meteor.user()) {
        return noDataAvailable;
    }
        const handler = Meteor.subscribe('tasks', search, LIMIT, offset);
        if (!handler.ready()) {
            return { ...noDataAvailable};
        }

        const itens = TasksCollection.find(hideCompleted ? pendingOnlyFilter : nadaFilter,
            {
              sort: { createdAt: -1 },
            }).fetch();
        return {itens};
    })

    const generateList = () => {
        // return itens.map((e,index) => SingleCard(e, index))
        return itens.map(itens => <SingleCard  key={itens._id} iten={itens} task={ itens.task }  taskSubtitle={ itens.taskSubtitle } onEditSituation={situationTask} onDeleteClick={deleteTask} onEditClick={editTask}/>)
    }

    const handleChange = e => {
        setSearch(e.target.value)
    } 
  
    return (
        <Box>
            <Box className='list'>
                <h1>Tarefas Cadastradas</h1>
                <TextField id="outlined-basic" label="Pesquisar" variant="outlined" onChange={handleChange} name="search"/>

                <Box className='filter' sx={{marginTop: 1}}>
                <button onClick={() => setHideCompleted(!hideCompleted)}>
                  {hideCompleted ? 'Show all' : 'Hide Completed'}
                </button>
              </Box>

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

            <Box className='add'>
                {/* <Link to='/profile'> */}
                <Button onClick={() => history.push('/profile')}>
                    <AccountCircleIcon sx={{ 
                        color: 'green', 
                        fontSize: 50, 
                        left: '40px', 
                        position: 'absolute'}}
                    />
                </Button>
            </Box>

            <Box>
                <Pagination
                    limit={LIMIT}
                    total={12}
                    offset={offset}
                    setOffset={setOffset}
                />
            </Box> 
        </Box>   
    )
}
