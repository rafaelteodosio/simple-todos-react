import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Box, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useNavigate } from 'react-router-dom';

export const LoginWithGithub = () => {
  const navigate = useNavigate()

  const handleGithubLogin = () => {
    Meteor.loginWithGithub({
      requestPermissions: ['user'],
      loginStyle: 'popup',
    },
      (error) => {
        if (error) {
          console.error("Erro ao fazer login com o GitHub:", error);
        } else {
          navigate('/dashboard');
        }
      });
  };

  return (
    <Box display={'flex'} gap={2} alignItems={'center'} onClick={handleGithubLogin}>
      <Button type="button" className="github-btn">
        Login with Github
      </Button>
      <GitHubIcon style={{ cursor: 'pointer' }} />
    </Box>
  );
};