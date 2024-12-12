import React, { useState } from 'react';
import { Box, Button, TextField, Icon, IconButton, InputAdornment } from '@mui/material';
import { Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Realizar la solicitud a la API
    fetch(`http://localhost:3030/login?user=${username}&password=${password}`)
      .then(response => response.json())
      .then(response => {
        console.log('Lo que nos llega de la base de datos: ');
        console.log(response.data);
        
        if (response.data.length !== 0) {
          // Si hay datos, el usuario y contraseña son correctos
          dispatch(authActions.login({
            name: username,
            rol: response.data?.rol,  // Tomamos el rol que llega del backend //Pendiente de como poner comprobacion automatica del rol
          }));
          navigate('/home');
        } else {
          // Si no, alertar al usuario que son incorrectos
          setError(true);
        }
      })
      .catch(err => {
        console.error('Error al realizar la solicitud:', err);
        setError(true);
      });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: 800,
        margin: 'auto',
        padding: 4,
        borderRadius: 1,
        backgroundColor: 'background.paper',
        boxShadow: 3
      }}
    >
      <Icon sx={{ fontSize: 40, color: 'primary', alignSelf: 'left' }}>login</Icon>

      <TextField
        label='Usuario'
        variant='outlined'
        fullWidth
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label='Contraseña'
        variant='outlined'
        type={showPassword ? 'text' : 'password'}
        fullWidth
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button variant='contained' color='secondary' fullWidth type='submit'>
        Ingresar
      </Button>

      {error && <Alert severity='warning'>Usuario o contraseña incorrectos</Alert>}
    </Box>
  );
};

export default Login;