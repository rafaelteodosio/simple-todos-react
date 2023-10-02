import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, FormGroup, Grid, MenuItem, Select, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { format } from 'date-fns';
import { TaskSituationControl } from './TaskSituationControl';

const defaultTheme = createTheme();

export const EditTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [situation, setSituation] = useState([{ text: 'Cadastrada', value: 'registered' }]);
  const [date, setDate] = useState(new Date());
  const [createdBy, setCreatedBy] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [isPersonal, setIsPersonal] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = urlToRedirect => {
    navigate(`${urlToRedirect}`);
  }

  const situationOption = [
    {
      text: 'Cadastrada',
      value: 'registered'
    },
    {
      text: 'Em Andamento',
      value: 'inProgress'
    },
    {
      text: 'Concluida',
      value: 'finished'
    },
  ];

  useEffect(() => {
    Meteor.call('task.getById', id, (error, result) => {
      if (error) {
        console.error('Erro ao buscar a tarefa:', error.reason);
      } else {
        setTask(result);
        setDate(format(new Date(result?.createdAt), 'yyyy-MM-dd'));
        setSituation(result?.situation || 'registered');
        setName(result?.name);
        setDescription(result?.description);
        setIsPersonal(result?.isPersonal || false);
        handleOwnerName(result?.userId);
      }
    });
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    const newTask = { ...task, name, description, isPersonal };
    Meteor.call('tasks.update', id, newTask, (error) => {
      if (error) {
        console.error('Erro ao buscar a tarefa:', error.reason);
      } else {
        handleNavigate('/tasks');
      }
    });
  }

  const handleChangeSituation = (event) => {
    setSituation(event);
  }

  const handleChangeDate = (event) => {
    setDate(event);
  }

  const handleOwnerName = (_userId) => {
    const owner = Meteor.users.findOne(_userId);
    setCreatedBy(owner?.profile?.name || owner?.username);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Editar Tarefa
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  disabled={!editMode}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="description"
                  required
                  fullWidth
                  id="description"
                  label="Descrição"
                  disabled={!editMode}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  labelId="situation-label"
                  id="situationId"
                  defaultValue='registered'
                  value={situation}
                  label="Situação"
                  disabled
                >
                  {situationOption.map((item, index) => (
                    <MenuItem key={index} value={item.value}>{item.text}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Data de Criação"
                  name="createDate"
                  type="date"
                  value={date}
                  disabled
                  onChange={(e) => handleChangeDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Criador"
                  name="createdBy"
                  fullWidth
                  id="createdById"
                  disabled
                  value={createdBy}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox checked={isPersonal} disabled={!editMode} onChange={() => setIsPersonal(prev => !prev)} />} label="Pessoal" />
                </FormGroup>
              </Grid>
            </Grid>
            {editMode ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Salvar
              </Button>
            ) : (
              <>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setEditMode(prev => !prev);
                  }}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Editar
                </Button>
                <TaskSituationControl onSituationChange={handleChangeSituation} task={task} _taskId={id} />
              </>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider >
  );
}