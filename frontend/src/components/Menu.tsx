import React, { useEffect, useState } from 'react';
import { Typography, IconButton, Container, Button, Paper, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, Drawer } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import { RootState } from '../store';
import { AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HelpIcon from '@mui/icons-material/Help';


const Menu: React.FC = () => {
// Accedemos a los datos del usuario desde el estado de Redux
const userData = useSelector((state: RootState) => state.authenticator);
const isLoggedin = userData.isAutenticated
const userRole = userData?.userRol;

const [open, setOpen] = useState(false);
const dispatch = useDispatch();
const navigate = useNavigate();

const toggleDrawer = (newOpen: boolean) => () => {
  setOpen(newOpen);
};

useEffect(() => {
  if (!isLoggedin) {
      navigate('/');
  }
}, [isLoggedin, navigate]);


const handleLogout = () => {
  dispatch(authActions.logout());
  navigate('/');
};

const DrawerList = (
  <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
    <List>
      {/* Link a la página Home */}
      <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItemButton>
        </ListItem>
      </Link>
      {/* Link a la página Reports */}
      {userRole === 'admin' && (
            <Link to="/reports" style={{ textDecoration: 'none', color: 'black' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Informes" />
                </ListItemButton>
              </ListItem>
            </Link>
          )}
                {/* Link a la página prestamo */}
      <Link to="/Prestamos" style={{ textDecoration: 'none', color: 'black' }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Gestion Prestamos" />
          </ListItemButton>
        </ListItem>
      </Link>
           {/* Link a la página Ayuda: Visible para todos */}
           <Link to="/Ayuda" style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HelpIcon />
                </ListItemIcon>
                <ListItemText primary="Ayuda" />
              </ListItemButton>
            </ListItem>
          </Link>
      {/* Botón para cerrar sesión */}
      <ListItem disablePadding onClick={handleLogout}>
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Salir" />
        </ListItemButton>
      </ListItem>
    </List>
  </Box>
);

return (
  <><Container sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Botón hamburguesa para abrir el Drawer */}
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          {/* Drawer (Menú desplegable) */}
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
          {/* Nombre del usuario logueado */}
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            {userData.userName || 'Usuario'}
          </Typography>
          {/* Renderizar icono condicionalmente según el rol */}
        <IconButton color="inherit">
              {userRole === 'admin' ? <AdminPanelSettingsIcon /> : <AccountCircle />}
            </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
    </Container></>

);
};

export default Menu;