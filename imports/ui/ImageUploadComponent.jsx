import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Grid, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const ImageUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        Meteor.call('images.insert', { data: base64Data, name: selectedFile.name, type: selectedFile.type }, (error) => {
          if (error) {
            console.error(error);
          } else {
            console.log('Upload bem-sucedido!');
          }
        });
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={9}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-input"
        />
        <label htmlFor="file-input">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Selecionar Imagem
          </Button>
        </label>
      </Grid>
      <Grid item xs={12} md={3}>
        {selectedFile && (
          <Typography variant="body1" color="textSecondary">
            {selectedFile.name}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleUpload}>
          Enviar Imagem
        </Button>
      </Grid>
    </Grid>
  );
};