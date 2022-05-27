import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PositionedMenu from './components/PositionedMenu'

export default function SingleCard({ iten, key, task, taskSubtitle, onDeleteClick }) {

    return (
          <ul key={key}>
              <List sx={{ width: '800px', maxWidth: 500, bgcolor: '#D3D3D3' }}>
                <ListItem >
                        <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'green' }} variant="rounded">
                        <AssignmentIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={task} secondary={taskSubtitle} />
                        <PositionedMenu  onDeleteClick={onDeleteClick} iten={iten}/>
                    </ListItem>
              </List>
          </ul>        
      );
    }
