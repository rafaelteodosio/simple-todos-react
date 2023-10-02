import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const TaskCard = ({ title = 'Tarefas', taskCount = 0, buttonText, urlToRedirect }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`${urlToRedirect}`);
  }

  return (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">
          {taskCount}
        </Typography>
      </CardContent>
      {buttonText && <CardActions>
        <Button onClick={handleNavigate} size="small">{buttonText}</Button>
      </CardActions>}
    </Card>
  );
}

TaskCard.propTypes = {
  title: PropTypes.string,
  taskCount: PropTypes.number,
  buttonText: PropTypes.string,
  urlToRedirect: PropTypes.string,
}