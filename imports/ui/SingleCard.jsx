import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PositionedMenu from './components/PositionedMenu'
import { TasksCollection } from '../db/TasksCollection';
import { Meteor } from 'meteor/meteor';
import { useState } from 'react';
import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SingleCard({ iten, task, taskSubtitle, onDeleteClick, onEditClick, onEditSituation }) {

    // let [situation, setSituation] = useState('');

    const user = Meteor.users.findOne(iten.userId);
    
    const handleChange = (event) => {
        // setSituation(event.target.value);

        Meteor.call('tasks.situation', iten._id, event.target.value)

    };

    var concluida = iten.situation === 'Cadastrada' ? <MenuItem disabled value={'Concluida'}>Concluida</MenuItem> :  <MenuItem value={'Concluida'}>Concluida</MenuItem>

    let content = ''
        if(iten.userId === user?._id ) {
            content = (
                <>
                    <Box sx={{ minWidth: 120, maxWidth: 200, marginTop: 1 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Situação</InputLabel>
                                <Select
                                // defaultValue={'Masculino'}
                                    name='situation'
                                    id="demo-simple-select"
                                    onChange={handleChange}
                                    defaultValue={iten.situation}
                                >
                                <MenuItem value={'Cadastrada'}>Cadastrada</MenuItem>
                                <MenuItem value={'Em andamento'}>Em andamento</MenuItem>
                                {concluida}
                                </Select>
                        </FormControl>
                    </Box>
                </>
            )
        } else {
            content = (
                <> 
                    <Box sx={{ minWidth: 120, maxWidth: 200, marginTop: 1 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Situação</InputLabel>
                                <Select
                                // defaultValue={'Masculino'}
                                    disabled
                                    name='situation'
                                    id="demo-simple-select"
                                    onChange={handleChange}
                                    defaultValue={iten.situation}
                                >
                                <MenuItem value={'Cadastrada'}>Cadastrada</MenuItem>
                                <MenuItem value={'Em andamento'}>Em andamento</MenuItem>
                                {concluida}
                                </Select>
                        </FormControl>
                    </Box>
               </>
            )   
        }

    return (
          <ul>
              <List sx={{ width: '800px', maxWidth: 500, bgcolor: '#D3D3D3' }} >
                <ListItem >
                        <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'green' }} variant="rounded">
                        <AssignmentIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`${task} | ${taskSubtitle}`} secondary={user?.username} />
                        {content}
                        {/* <input 
                            type="checkbox"
                            checked={!!iten.isChecked}
                            onClick={() => onCheckboxClick(iten)}
                            readOnly
                        /> */}
                        <PositionedMenu  onDeleteClick={onDeleteClick} iten={iten} onEditClick={onEditClick} />
                    </ListItem>
              </List>
          </ul>        
      );
    }
