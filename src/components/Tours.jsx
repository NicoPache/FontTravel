import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ApiService } from '../services/ApiService'; 
function Tours() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const getTours = async () => {
      try {
        
        const response = await ApiService.getTours();
        setTours(response.data); 
      } catch (error) {
        console.error('Error al obtener los tours:', error);
     
      }
    };

    getTours();
  }, []); 
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Destino</TableCell>
            <TableCell align="right">Fecha Inicio</TableCell>
            <TableCell align="right">Fecha Fin</TableCell>
            <TableCell align="right">Precio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tours.map((tour) => (
            <TableRow key={tour.id}>
              <TableCell component="th" scope="row">
                {tour.nombre}
              </TableCell>
              <TableCell align="right">{tour.destino}</TableCell>
              <TableCell align="right">{tour.fechaInicio}</TableCell>
              <TableCell align="right">{tour.fechaFin}</TableCell>
              <TableCell align="right">{tour.precio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Tours;
