import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography ml={16} variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Travel
        </Typography>
        <Button color='inherit' component={Link} to='/tours'>
          Tours
        </Button>
        <Button color='inherit' component={Link} to='/tours/reservas'>
          Reservas
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;