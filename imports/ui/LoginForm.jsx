import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react'

export const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = e => {
        e.preventDefault()

        Meteor.loginWithPassword(username, password);
    };

    return (
        <div className='login-content'>
            <h1>Bem vindo ao todo list!</h1>
            <form onSubmit={submit} className='login-form'>
                <div>
                    <input
                    type='text'
                    placeholder='Username'
                    name='username'
                    required
                    onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        required
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type='submit'>Entrar</button>
                </div>
            </form>
            <div>
                <button>Cadastrar</button>
            </div>
            <div>
                <button>Esqueci minha senha</button>
            </div>

        </div>   
    )
}
