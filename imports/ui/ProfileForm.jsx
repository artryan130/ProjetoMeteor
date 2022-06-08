import { Box } from '@mui/material';
import { Meteor } from 'meteor/meteor';
import React from 'react'
import { Input } from '@mui/material';
import { useTracker } from 'meteor/react-meteor-data';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useHistory } from "react-router-dom";

export default function ProfileForm() {

    const user = useTracker(()=> Meteor.user())

    const history = useHistory();

    const [username, setUsername] = useState(''); 

    const [userProfile, setUserProfile] = useState({
        username: '',
        email: '',
        data: '',
        sexo: '',
        empresa: '' 
    })

    const [edit, setEdit] = useState(false)

    const submit = e => {
        e.preventDefault()
        if (!user) return;
        {console.log(user._id)}

        Meteor.call('user.edit', user._id, userProfile.username, userProfile.email, userProfile.nascimento, userProfile.sexo, userProfile.empresa)

        
        setUserProfile("");

        history.push("/todo");
    };




    const startEdit = e => {
        setEdit(true)
    }

    const handleChange = e => {
        if(e.target.name === 'username'){
            setUserProfile({...userProfile, 
            username: e.target.value
            })
        }else if(e.target.name === 'email') {
            setUserProfile({...userProfile, 
                email: e.target.value
            })
        }else if(e.target.name === 'data') {
            setUserProfile({...userProfile, 
                data: e.target.value
            })
        }else {
            setUserProfile({...userProfile,
                [e.target.name]: e.target.value
            })
        }
    }

    let content = ''
        if(edit == false) {
            content = (
                <>
                    <Box>
                        <h1>Este aqui são seus dados atuais</h1>
                        <form>
                            <Box>
                                <label>
                                    Nome:
                                </label>
                                <Input 
                                type='text'
                                name='username'
                                defaultValue={!!user && user.username}
                                disabled
                                />
                            </Box>

                            <Box>
                                <label>
                                    Email:
                                </label>
                                <Input 
                                type='text'
                                name='email'
                                defaultValue={!!user && user.email}
                                disabled
                                />
                            </Box>

                            <Box>
                                <label>
                                    Data de nascimento:
                                </label>
                                <Input 
                                type='text'
                                name='data'
                                defaultValue={!!user && user.date}
                                disabled
                                />
                            </Box>
                        </form>
                        <Box className='edit-buttons'>
                            <Button onClick={startEdit}>Editar</Button>
                            <Button onClick={() => history.push('/todo')}>Cancelar</Button>
                        </Box>
                    </Box>
                </>
            )
        }else {
            content = (
                <>
                    <Box>
                        <h1>Editar seus dados</h1>
                        <form onSubmit={submit}>
                            <Box>
                                <label>
                                    Nome:
                                </label>
                                <Input 
                                type='text'
                                name='username'
                                defaultValue={!!user && user.username}
                                onChange={handleChange}
                                />
                            </Box>

                            <Box>
                                <label>
                                    Email:
                                </label>
                                <Input 
                                type='text'
                                name='email'
                                defaultValue={!!user && user.email}
                                onChange={handleChange}
                                />
                            </Box>

                            <Box>
                                <label>
                                    Data de nascimento:
                                </label>
                                <Input 
                                type='text'
                                name='data'
                                defaultValue={!!user && user.date}
                                onChange={handleChange}
                                />
                            </Box>

                            <Box className='edit-buttons'>
                                <Button type='submit'>Finalizar</Button>
                                <Button onClick={() => history.push('/todo')}>Cancelar</Button>
                            </Box>

                        </form>
                        
                    </Box>
                </>
            )
        }



    return (

        // <Box>
        //     <Input 
        //                     type='text'
        //                     value={user?.username}
        //                 />
        // </Box>

        <Box>
            {console.log(userProfile)}
            {content}
        </Box>
    )
}