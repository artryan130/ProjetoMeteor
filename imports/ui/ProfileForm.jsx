import { Box } from '@mui/material';
import { Meteor } from 'meteor/meteor';
import React from 'react'
import { Input } from '@mui/material';
import { useTracker } from 'meteor/react-meteor-data';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useHistory } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const ProfileForm = () => {

    const user = useTracker(()=> Meteor.user())

    const history = useHistory();

    const [userProfile, setUserProfile] = useState({
        username: '',
        email: '',
        data: '',
        sexo: '',
        empresa: '', 
        foto: '', 
    })

    useEffect(() => {
        setUserProfile(user?.profile)
    }, [])

    const [edit, setEdit] = useState(false)

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
        }else if(e.target.name === 'sexo') {
            setUserProfile({...userProfile, 
                sexo: e.target.value
            })
        }else {
            setUserProfile({...userProfile,
                [e.target.name]: e.target.value
            })
        }
    }

    function setDados(email, data, sexo, empresa, foto) {
        const newData = {
            email: email,
            data: data, 
            sexo: sexo,
            empresa: empresa,
            foto: foto
        };

        Meteor.users.update(user._id, {
            $set: { profile: newData}
        });
    };

    let base64code = ""
    const onChange = e => {
      const files = e.target.files;
      const file = files[0];
      getBase64(file);
    };
   
    const onLoad = fileString => {
      console.log(fileString);
      this.base64code = fileString
      setUserProfile({...userProfile, 
        foto: fileString
    })

    };
   
    const getBase64 = file => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        onLoad(reader.result);
      };
    };

    const submit = e => {
        e.preventDefault()
        if (!user) return;
        
        setDados(userProfile.email, userProfile.data, userProfile.sexo, userProfile.empresa, userProfile.foto);

        setUserProfile("");

        history.push('/todo')
    };

    
    let content = ''
        if(edit == false) {
            content = (
                <>
                    <Box>
                        <h1>Este aqui s??o seus dados atuais</h1>
                        <form>
                            <Box >
                                <img src={user?.profile.foto} className='image-profile' />
                            </Box>

                            <Box>
                                <label>
                                    Nome:
                                </label>
                                <Input 
                                type='text'
                                name='username'
                                // defaultValue={!!user && user.username}
                                value={user?.username}
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
                                value={user?.profile.email}
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
                                value={user?.profile.data}
                                disabled
                                />
                            </Box>

                            <Box>
                                <label>
                                    Sexo:
                                </label>
                                <Input 
                                type='text'
                                name='sexo'
                                value={user?.profile.sexo}
                                disabled
                                />
                            </Box>

                            <Box>
                                <label>
                                    Empresa:
                                </label>
                                <Input 
                                type='text'
                                name='empresa'
                                value={user?.profile.empresa}
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
                    <Box className='box-box'>
                        <h1>Editar seus dados</h1>
                        <form onSubmit={submit}>
                            <Box>
                                <form className='form-form'>
                                    <input type="file" onChange={onChange} defaultValue={user?.foto}/>
                                    <img src={this.base64code} className='image-profile'/>
                                    {/* <textarea rows="50" cols="50" defaultValue={this.base64code}></textarea> */}
                                </form>
                            </Box>

                            <Box sx={{ width: '800px', maxWidth: 500, bgcolor: '#D3D3D3', marginBottom: 2, marginTop: 2 }} >
                                <label>
                                    Nome:
                                </label>
                                <Input 
                                type='text'
                                name='username'
                                defaultValue={user?.username}
                                onChange={handleChange}
                                />
                            </Box>

                            <Box sx={{ width: '800px', maxWidth: 500, bgcolor: '#D3D3D3', marginBottom: 2 }}>
                                <label>
                                    Email:
                                </label>
                                <Input 
                                type='text'
                                name='email'
                                defaultValue={user?.profile.email}
                                onChange={handleChange}
                                />
                            </Box>

                            <Box sx={{ width: '800px', maxWidth: 500, bgcolor: '#D3D3D3', marginBottom: 2 }}>
                                <label>
                                    Data de nascimento:
                                </label>
                                <Input 
                                type='text'
                                name='data'
                                defaultValue={user?.profile.data}
                                onChange={handleChange}
                                />
                            </Box>

                            <Box sx={{ minWidth: 120, maxWidth: 200, marginTop: 1 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                                    <Select
                                    // defaultValue={'Masculino'}
                                    name='sexo'
                                    id="demo-simple-select"
                                    onChange={handleChange}
                                    defaultValue={user?.profile.sexo}
                                    >
                                    <MenuItem value={'Feminino'}>Feminino</MenuItem>
                                    <MenuItem value={'Masculino'}>Masculino</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box sx={{ width: '800px', maxWidth: 500, bgcolor: '#D3D3D3', marginTop: 2 }}>
                                <label>
                                    Empresa:
                                </label>
                                <Input 
                                type='text'
                                name='empresa'
                                defaultValue={user?.profile.empresa}
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
        <Box>
            {content}
        </Box>
    )
}