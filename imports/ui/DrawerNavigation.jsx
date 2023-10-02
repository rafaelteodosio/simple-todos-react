import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, ListItemButton } from '@mui/material';
import { ImagesCollection } from '../db/FilesCollection';
import PropTypes from 'prop-types';

export const ProfileAvatar = ({ image }) => {
  return (
    <Avatar alt="Profile picture"
      src={image}
      sx={{ width: 40, height: 40, objectFit: 'cover' }}
    />
  );
}

export const DrawerNavigation = () => {
  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate();

  const { image } = useTracker(() => {
    const noDataAvailable = { image: '' };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('images.user');
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
    const image = ImagesCollection.findOne({ _userId: user?._id });
    return { image };
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const logout = () => {
    setDrawerOpen(false);
    Meteor.logout();
    navigate('/login')
  }

  const drawerItems = [
    { text: user?.profile?.name || user?.username, email: user?.profile?.email, icon: image?.data ? <ProfileAvatar image={image?.data} /> : <PersonIcon />, link: `/profile` },
    { text: 'Tarefas', icon: <AssignmentIcon />, link: '/tasks' },
    { text: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
    { text: 'Sair', icon: <LogoutIcon />, onClick: logout },
  ];

  return (
    <Box>
      <MenuIcon onClick={toggleDrawer(true)} />
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {drawerItems.map((item, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton component={Link} to={item.link || null} onClick={item.onClick || toggleDrawer(false)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} secondary={item.email || null} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

ProfileAvatar.propTypes = {
  image: PropTypes.string,
};