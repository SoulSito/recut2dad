import React, { useState } from 'react';
import { Alert, Box, Button, Card, CardContent, CircularProgress, Container, Paper, Typography } from '@mui/material';
import Menu from '../components/Menu';
import InformeColeccion from '../components/InformeColeccion'; // Importar el nuevo componente
import { authActions } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Reports: React.FC = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/');
  };

    // Estado para manejar si el informe ha sido generado
    const [isReportGenerated, setIsReportGenerated] = useState(false);
    const [data, setData] = useState<any[]>([]); // Almacenaremos los datos obtenidos de la base de datos
    const [loading, setLoading] = useState<boolean>(false); // Para controlar el estado de carga
    const [error, setError] = useState<string>(''); // Para almacenar el error en caso de que la API falle

     // Función para obtener los datos de la tabla coleccion
  const fetchReportData = async () => {
    setLoading(true); // Activar el estado de carga
    setError(''); // Limpiar el error previo
    try {
      const response = await fetch('http://localhost:3030/getItems');
      const data = await response.json();
      
      if (response.ok) {
        setData(data.data); // Almacenamos los datos obtenidos
        setIsReportGenerated(true); // Indicamos que el informe ha sido generado
      } else {
        throw new Error('Error al obtener los datos del informe');
      }
    } catch (error) {
      setError('Hubo un problema al cargar los datos. Inténtalo nuevamente.');
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  return(
   <Box sx={{ flexGrow: 1 }}>
  <Menu/>  {/* Usamos el Menu como encabezado */}

  {/* Cuerpo de la página de Reportes */}
  <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
    <Card sx={{ width: '100%', maxWidth: 1500, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h4" color="primary" gutterBottom>
          Página de Reports de Anibal
        </Typography>
        <Typography variant="body1" color="#1976d2" gutterBottom>
          Aquí puedes ver los informes y generar nuevos reportes.
        </Typography>
         
        {/* Mostrar el botón solo si no hay informe generado aún */}
          {!isReportGenerated && !loading && (
          <Button
            variant="contained"
            color="secondary"
            onClick={fetchReportData}
            sx={{
              mt: 3,
              padding: '12px 24px',
              borderRadius: '20px',
              fontSize: '16px',
              width: '50%',  // Ajustamos el tamaño del botón
              alignSelf: 'center',
              boxShadow: 3,
              '&:hover': {
                backgroundColor: '#1976d2', // Color cuando el botón está en hover
              },
            }}
          >
            GENERAR INFORME COLECCIÓN
          </Button>
        )}

        {/* Mostrar un indicador de carga mientras los datos se obtienen */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Mostrar el mensaje de error si la carga falla */}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {/* Renderizar el informe si la variable de control está en true */}
        {isReportGenerated && !loading && (
          <Paper sx={{ mt: 4, padding: 3, boxShadow: 3 }}>
            {/* Eliminamos el mensaje "Informe Generado" */}
            <InformeColeccion data={data} />
          </Paper>
        )}
      </CardContent>
    </Card>
  </Container>
</Box>
);
};

export default Reports;