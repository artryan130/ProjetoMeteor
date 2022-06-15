import { Box, Button } from '@mui/material';
import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react'
import { Input } from '@mui/material';
import { Accounts } from 'meteor/accounts-base';
import { useHistory } from "react-router-dom";

export const RegisterForm = () => {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [profile, setProfile] = useState({
        email: 'none',
        data: '01/01/2001',
        sexo: 'none',
        empresa: 'none'
    })

    const history = useHistory();

    const submit = e => {
        e.preventDefault()

        Accounts.createUser({username: username, password: password, profile: profile})

        history.push('/')

    }

    return (

        <Box className='login-content'>
            <h1>Bem vindo ao cadastro!</h1>
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
                    <Button type='submit'>Cadastrar</Button>
                </Box>
            </form>
        </Box> 
    )

}