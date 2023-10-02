import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Avatar, Box, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id, (error) => {
  if (error) console.error('Não autorizado', error);
});

export const TaskList = ({ user, task }) => {

  const navigate = useNavigate();

  const handleNavigate = urlToRedirect => {
    navigate(`${urlToRedirect}`);
  }

  const handleOwnerName = (_userId) => {
    const owner = Meteor.users.findOne(_userId);
    return owner?.profile?.name || owner?.username;
  }

  return (
    <ListItem
      secondaryAction={
        <Box display='flex' gap={2}>
          <IconButton
            onClick={() => {
              return deleteTask(task)
            }}
            edge="end" aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              return user._id === task.userId ? handleNavigate(`/edittask/${task._id}`) : console.error('Access denied.');
            }}
            edge="end" aria-label="edit"
          >
            <EditIcon />
          </IconButton>
        </Box >
      }
    >
      <ListItemAvatar>
        <Avatar>
          <AssignmentIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={task.name} secondary={handleOwnerName(task?.userId)} />
    </ListItem >
  );
}

TaskList.propTypes = {
  task: PropTypes.object,
  user: PropTypes.object
}