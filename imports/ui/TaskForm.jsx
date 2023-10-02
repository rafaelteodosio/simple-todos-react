import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Button, Grid, TextField } from '@mui/material';

export const TaskForm = () => {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;
    Meteor.call('tasks.insert', text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid flexWrap={'nowrap'} padding={2} justifyContent={'center'} container spacing={2} alignItems="center">
        <Grid item >
          <TextField
            fullWidth
            label="Nova Tarefa"
            variant="outlined"
            size="small"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Grid>
        <Grid item >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Adicionar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
TaskForm.propTypes = {
  user: PropTypes.object,
};