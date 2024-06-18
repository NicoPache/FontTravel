import * as React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import Title from './Title';
import { ApiService } from '../services/ApiService';
import Button from '@mui/material/Button';
import BorrarReserva from './BorrarReserva';
import TableReservas from './TableReservas';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';

export const Reservas = () => {
  const [TourSelected, setTourSelected] = useState('');
  const [TourList, setTourList] = useState([]);
  const [showErrorAlertReserva, setShowErrorAlertReserva] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [messageReserva, setmessageReserva] = useState(false);
  const [reservas, setReservas] = useState([]);

  //obtengo los tours para el select
  useEffect(() => {
    const getTours = async () => {
      try {
        const response = await ApiService.getTours();
        setTourList(response.data);
      } catch (error) {
        console.error('Error al obtener los tours:', error);
      }
    };

    getTours();
  }, []);

  //evento para obtener el value del select
  const handleChange = (event) => {
    setTourSelected(event.target.value);
  };

  //handle para guardar la reserva
  const handleReserva = () => {
    const reserva = {
      ClienteId: localStorage.getItem('idUsuario'),
      TourId: TourSelected,
    };

    console.log(reserva)
  //dejo un manejo de peticion ajax sin await, lo resuevo con then 
    ApiService.addReserva(reserva).then((response) => {
        setShowSuccessAlert(true); 
        setTimeout(() => {
          setShowSuccessAlert(false); 
        }, 3000); 
        getReservas();
        
    }).catch((error) => {
        setmessageReserva(error.response.data.message)
        setShowErrorAlertReserva(true); 
        setTimeout(() => {
          setShowErrorAlertReserva(false); 
       
     },3000);
  });
}

const getReservas = async () => {
    try {
      const response = await ApiService.getReservas();
    
      setReservas(response.data);
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    }
  };
   //obtencion de reservas
useEffect(() => {
    getReservas()
     }, []);

  return (
    <>
     
      <Title text="Solicitar Reservas" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '120', 
        }}
      >
        <FormControl fullWidth sx={{ maxWidth: 400 }}>
          <InputLabel id="demo-simple-select-label">Tours</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={TourSelected}
            label="Tour"
            onChange={handleChange}
          >
            {TourList.map((tour) => (
              <MenuItem key={tour.id} value={tour.id}>
                {tour.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
     
      <Box  mt={3}>
      <Button variant="outlined" disabled={TourSelected==''} onClick={handleReserva}>Reservar</Button>
      </Box> 
       {showSuccessAlert && (
        <Box mt={3}>
          <Alert severity="success">Reserva Exitosa.</Alert>
        </Box>
      )}
      {showErrorAlertReserva && (
        <Box mt={3}>
          <Alert severity="error">{messageReserva}</Alert>
        </Box>
      )}
     
    </>
  );
};

export default Reservas;
