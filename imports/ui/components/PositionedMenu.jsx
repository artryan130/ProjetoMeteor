import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { EditTask } from '../EditTask';
import { useHistory } from "react-router-dom";
import { Box } from '@mui/material';

export default function PositionedMenu({ onDeleteClick, iten }) {
  
  const history = useHistory();
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function dataAtualFormatada(data){
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano  = data.getFullYear();
    return dia+"/"+mes+"/"+ano;
  }

  return (
    <Box>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        
        <MenuItem onClick={() => history.push({pathname: '/edit', state: { task: iten.task, taskSubtitle: iten.taskSubtitle, userId: iten.userId, _id: iten._id, date: dataAtualFormatada(iten.createdAt)} })}>Editar</MenuItem>
        
        <MenuItem onClick={() => onDeleteClick(iten)}>Excluir</MenuItem>
      </Menu>
    </Box>
  );
}