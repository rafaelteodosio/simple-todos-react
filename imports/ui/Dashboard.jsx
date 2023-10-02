import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, Grid, Typography } from '@mui/material';
import { TaskCard } from './TaskCard';

const defaultTheme = createTheme();

export const Dashboard = () => {

  const user = useTracker(() => Meteor.user());

  const { isLoading, taskText } = useTracker(() => {
    const noDataAvailable = { tasks: [], countRegisteredTasks: 0, countInProgressTasks: 0, countFinishedTasks: 0 };
    if (!user) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const countRegisteredTasks = TasksCollection.find({ $or: [{ situation: 'registered' }, { situation: null }] }).count();
    const countInProgressTasks = TasksCollection.find({ situation: 'inProgress' }).count();
    const countFinishedTasks = TasksCollection.find({ situation: 'finished' }).count();

    const taskText = [
      {
        title: 'Total de Tarefas Cadastradas',
        taskCount: countRegisteredTasks,
        buttonText: 'Tarefas Cadastradas',
        urlToRedirect: '/tasks'
      },
      {
        title: 'Total de Tarefas em Andamento',
        taskCount: countInProgressTasks
      },
      {
        title: 'Total de Tarefas Finalizadas',
        taskCount: countFinishedTasks
      }
    ]

    return { taskText };
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Typography component="h1" variant="h5">
            Bem Vindo
          </Typography>
          {isLoading ? (
            <div className="loading">loading...</div>) :
            (
              <Grid container spacing={2}>
                {taskText?.map((text, index) => (
                  <Grid key={index} item xs={12} sm={12}>
                    <TaskCard
                      title={text.title}
                      taskCount={text.taskCount}
                      buttonText={text.buttonText}
                      urlToRedirect={text.urlToRedirect}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
        </Box>
      </Container>
    </ThemeProvider>
  )
};
