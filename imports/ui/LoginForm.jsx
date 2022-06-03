import { Box, Button } from '@mui/material';
import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react'
import { Input } from '@mui/material';

export const LoginForm = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const submit = e => {
        e.preventDefault()

        Meteor.loginWithPassword(username, password, (e,r)=> {
            if(!e) {
                props.history.push('/')
            }
        } );
    };

    return (
        <Box className='login-content'>
            <h1>Bem vindo ao todo list!</h1>
            <form onSubmit={submit} className='login-form'>
                <Box>
                    <Input
                    type='text'
                    placeholder='Username'
                    name='username'
                    required
                    onChange={e => setUsername(e.target.value)}
                    />
                </Box>
                <Box>
                    <Input
                        type='password'
                        placeholder='Password'
                        name='password'
                        required
                        onChange={e => setPassword(e.target.value)}
                    />
                </Box>
                <Box>
                    <Button type='submit'>Entrar</Button>
                </Box>
            </form>
            <Box>
                <Button>Cadastrar</Button>
            </Box>
            <Box>
                <Button>Esqueci minha senha</Button>
            </Box>

        </Box>   
    )
}
