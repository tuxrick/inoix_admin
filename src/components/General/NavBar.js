import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../store/actions';

function NavBar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const token = localStorage.getItem("token");

  if(!token || token == null){
    window.location.href = '/login';
  }else{
    dispatch(loginSuccess(token));
  }

  const navItems = [
    { text: 'Home', path: '/' }, 
    { text: 'User', path: '/user' }, 
    { text: 'Logout', path: '/logout' }
];

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setDrawerOpen(false)}
      onKeyDown={() => setDrawerOpen(false)}
    >
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.text}>
            <RouterLink to={item.path} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemText primary={item.text} />
            </RouterLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{backgroundColor:"#5376B5"}}>
      <Toolbar>
        <IconButton
          color="#5376B5"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { xs: 'block', md: 'none' } }} // Menú hamburguesa visible solo en pantallas pequeñas
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          IONIX
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}> {/* Tabs visibles en pantallas medianas y grandes */}
          {navItems.map((item) => (
            <RouterLink to={item.path} key={item.text} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">{item.text}</Button>
            </RouterLink>
          ))}
        </Box>
      </Toolbar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default NavBar;
