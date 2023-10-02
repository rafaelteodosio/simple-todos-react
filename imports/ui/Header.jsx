import React from 'react';
import { DrawerNavigation } from './DrawerNavigation';
import { AppBar, Toolbar, Typography } from '@mui/material';

export const Header = () => {
  return (
    <AppBar style={{ gap: '8px' }} position="static">
      <Toolbar variant="dense">
        <DrawerNavigation />
        <Typography variant="h6" color="inherit" component="div">
          To Do List
        </Typography>
      </Toolbar>
    </AppBar>
  );
}