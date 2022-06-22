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

export default function SingleCard({ iten, task, taskSubtitle, onDeleteClick, onEditClick, onCheckboxClick }) {

    const user = Meteor.users.findOne(iten.userId);

    return (
          <ul>
              <List sx={{ width: '800px', maxWidth: 500, bgcolor: '#D3D3D3' }} >
                <ListItem >
                        <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'green' }} variant="rounded">
                        <AssignmentIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`${task} | ${taskSubtitle}`} secondary={user.username} />
                        <input 
                            type="checkbox"
                            checked={!!iten.isChecked}
                            onClick={() => onCheckboxClick(iten)}
                            readOnly
                        />
                        <PositionedMenu  onDeleteClick={onDeleteClick} iten={iten} onEditClick={onEditClick} />
                    </ListItem>
              </List>
          </ul>        
      );
    }
