import React from 'react'
import SingleCard from './SingleCard'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';

export default function TodoList() {
  
    const itens = [
        {
            primary: 'Levar cão para passear',
            secondary: 'Joao Pedro de Jesus'
        },
        {
            primary: 'Prova de eletromagnetismo',
            secondary: 'Arthur Ryan'
        },
        {
            primary: 'Estágio Synergia',
            secondary: 'Joao Lucas'
        },

    ]


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
