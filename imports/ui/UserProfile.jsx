import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ImageUploadComponent } from './ImageUploadComponent';

const defaultTheme = createTheme();

export const UserProfile = () => {
  const user = useTracker(() => Meteor.user());

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [gender, setGender] = useState('');
  const [company, setCompany] = useState('');

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setEmailError('Endereço de email inválido');
    } else {
      setEmailError(null);
    }

    Meteor.call('user.update', user._id, { email, name, date, gender, company }, (error, userId) => {
      if (error) {
        console.error('Erro ao atualizar o usuário:', error.error, error.reason);
      } else {
        console.log('Usuário atualizado com sucesso! ID:', userId);
        navigate('/dashboard');
      }
    });
  };

  const handleChangeDate = (event) => {
    setDate(event);
  };

  const handleChangeGender = (event) => {
    setGender(event);
  };

  useEffect(() => {
    if (user) {
      setEmail(user?.profile?.email);
      setName(user?.profile?.name);
      setDate(format(new Date(user?.profile?.date), 'yyyy-MM-dd'));
      setGender(user?.profile?.gender);
      setCompany(user?.profile?.company);
    }
  }, [])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Atualizar perfil
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="name"
                  name="name"
                  fullWidth
                  id="name"
                  label="Nome Completo"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!emailError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Data de Nascimento"
                  name="birthDate"
                  type="date"
                  value={date || '1990-01-01'}
                  onChange={(e) => handleChangeDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="gender-select-label">Gênero</InputLabel>
                  <Select
                    labelId="gender-select-label"
                    id="genderId"
                    value={gender}
                    label="Gênero"
                    onChange={(e) => handleChangeGender(e.target.value)}
                  >
                    <MenuItem value={'masculine'}>Masculino</MenuItem>
                    <MenuItem value={'feminine'}>Feminino</MenuItem>
                    <MenuItem value={'nonBinary'}>Não Binário</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="company"
                  name="company"
                  fullWidth
                  id="company"
                  label="Empresa"
                  autoFocus
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ImageUploadComponent />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Atualizar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}