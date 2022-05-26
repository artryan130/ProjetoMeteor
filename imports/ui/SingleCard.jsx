import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PositionedMenu from './components/PositionedMenu'

export default function SingleCard(props, index) {

    const { task, taskSubtitle } = props

    return (
          <ul key={index}>
              <List sx={{ width: '800px', maxWidth: 500, bgcolor: '#D3D3D3' }}>
                <ListItem >
                        <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'green' }} variant="rounded">
                        <AssignmentIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={task} secondary={taskSubtitle} />
                        {/* <MoreVertIcon onClick={() => console.log('Editar ou excluir')} /> */}
                        <PositionedMenu props={props} />
                    </ListItem>
              </List>
          </ul>        
      );
    }
