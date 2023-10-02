import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export const TaskSituationControl = ({ _taskId, task, onSituationChange = f => f }) => {

  const [situation, setSituation] = useState(task?.situation || 'registered');

  useEffect(() => {
    setSituation(task?.situation || 'registered');
  }, [task?.situation])

  const handleAdvanceSituation = () => {
    if (situation === 'registered') {
      setSituation('inProgress');
      handleChangeSituation('inProgress');
    } else if (situation === 'inProgress') {
      setSituation('finished');
      handleChangeSituation('finished');
    }
  };

  const handleRetrogradeSituation = () => {
    if (situation === 'inProgress') {
      setSituation('registered');
      handleChangeSituation('registered');
    } else if (situation === 'finished') {
      setSituation('inProgress');
      handleChangeSituation('inProgress');
    }
  };

  const handleChangeSituation = newSituation => {
    const newTask = { ...task, situation: newSituation }
    Meteor.call('tasks.update', _taskId, newTask, (error) => {
      if (error) {
        console.error('Erro ao buscar a tarefa:', error.reason);
      }
      onSituationChange(newSituation);
    });
  };

  return (
    <Grid>
      <Typography component="h5" variant="h5">
        Situação da tarefa
      </Typography>
      <Grid item xs={12} sm={6}>
        <Button
          variant="contained"
          disabled={situation === 'finished'}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleAdvanceSituation();
          }}
          sx={{ mt: 3, mb: 2 }}
        >
          Avançar Situação
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          variant="contained"
          disabled={situation === 'registered'}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleRetrogradeSituation();
          }}
          sx={{ mt: 3, mb: 2 }}
        >
          Retroceder Situação
        </Button>
      </Grid>
    </Grid>
  );
};

TaskSituationControl.propTypes = {
  _taskId: PropTypes.string,
  task: PropTypes.object,
  onSituationChange: PropTypes.func
}