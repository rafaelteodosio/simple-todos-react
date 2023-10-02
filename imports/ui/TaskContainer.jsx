import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { TaskForm } from './TaskForm';
import { Box, List, Typography } from '@mui/material';
import { TaskList } from './TaskList';

export const TaskContainer = () => {
  const user = useTracker(() => Meteor.user());

  const { isLoading, allTasks } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0, allTasks: [] };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const allTasks = TasksCollection.find({},
      {
        sort: { createdAt: -1 },
      }
    ).fetch();

    return { allTasks };
  });

  return (
    <Box className="main">
      <TaskForm />
      {isLoading && <Typography variant='h5' >Loading...</Typography>}
      <List>
        {allTasks.map(task => (
          <TaskList key={task._id} user={user} task={task} />
        ))}
      </List>
    </Box>
  );
}