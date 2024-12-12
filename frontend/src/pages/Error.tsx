import React from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Error: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h4" color="error">¡Oops!</Typography>
      <Typography variant="h6">Parece que algo salió mal.</Typography>
      <Typography>La página que estás buscando no se pudo encontrar.</Typography>
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Volver atrás
      </Button>
    </div>
  );
};

export default Error;