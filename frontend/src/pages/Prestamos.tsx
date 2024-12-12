import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'; // Usamos useSelector para acceder al estado global
import Menu from '../components/Menu'; // Importa el componente Menu
import { useSelector } from 'react-redux';
import { RootState } from '../store';

// Definir la interface ItemType
interface ItemType {
    id: number; // El id es obligatorio para cada ítem
    articulo: string;
    persona: string;
    fecha: string;
  }

const Prestamos: React.FC = () => {
  const userData = useSelector((state: RootState) => state.authenticator);
  const userRole = userData?.userRol;

    const [item, setItem] = useState<ItemType>({
      id: 0, // Inicializamos el id con 0 para el formulario
      articulo: '',
      persona: '',
      fecha: '',
    }); // Estado para los campos del formulario
    const [error, setError] = useState<string>(''); // Estado para manejar errores
    const [itemsList, setItemsList] = useState<ItemType[]>([]); // Estado para la lista de items
  
     
  
    // Manejar cambios en los campos del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setItem({
        ...item,
        [name]: value,
      });
    };
  
    // Validar el formulario antes de enviarlo
    const validateForm = (): boolean => {
      if (!item.articulo || !item.persona || !item.fecha) {
        setError('Por favor, completa todos los campos correctamente.');
        return false;
      }
      setError('');
      return true;
    };
  
    // Obtener los ítems desde la base de datos
    const fetchItems = async () => {
      const response2 = await fetch('http://localhost:3030/getItem2');
      const data2 = await response2.json();
      setItemsList(data2.data2); // Almacenamos los datos en itemsList
    };
  
    // Manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      // Validar el formulario
      if (!validateForm()) return;
  
      // Realizamos la llamada al endpoint para insertar los datos en la base de datos
      const response = await fetch('http://localhost:3030/addIte2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            articulo: item.articulo,
            persona: item.persona,
            fecha: item.fecha,
        }),
      });
  
      if (response.ok) {
        alert('Item insertado correctamente');
        setItem({ id: 0, articulo: '', persona: '', fecha: ''}); // Limpiar los campos después de la inserción
        fetchItems(); // Actualizar la lista de items después de la inserción
      } else {
        alert('Error al insertar el item');
      }
    };
  
    // Cargar los items al montar el componente
    useEffect(() => {
      fetchItems();
    }, []); // Solo se ejecuta una vez cuando el componente se monta
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Menu/>

      <Typography variant="h5" gutterBottom>
        Gestion de Prestamos-Añade Prestamos
      </Typography>

      {/* Mostrar el error si lo hay */}
      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Formulario */}
      {userRole === 'admin' && (
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="articulo"
              variant="outlined"
              fullWidth
              name="articulo"
              value={item.articulo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="persona"
              variant="outlined"
              fullWidth
              name="persona"
              value={item.persona}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              type='date'
              fullWidth
              name="fecha"
              value={item.fecha}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Insertar Datos
        </Button>
       
      </Box>
 )}
      {/* Mostrar los ítems insertados */}
      <Typography variant="h6" gutterBottom>
        Items Insertados:
      </Typography>

      <TableContainer sx={{ maxHeight: 400 }}>
        <Table aria-label="Items Table">
          <TableHead>
            <TableRow>
              <TableCell><strong>articulo</strong></TableCell>
              <TableCell><strong>persona</strong></TableCell>
              <TableCell><strong>fecha</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemsList.length > 0 ? (
              itemsList.map((row: ItemType) => (
                <TableRow key={row.id}>
                  <TableCell>{row.articulo}</TableCell>
                  <TableCell>{row.persona}</TableCell>
                  <TableCell>{row.fecha}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No hay datos disponibles.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Prestamos;