import React, { useState, useEffect } from 'react';
import { Table, Container, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const MoviesDashboard = () => {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    // This is where we'll add the API call later
    // For now, using mock data
    const mockData = [
      {
        "id": 1,
        "name": "Alice Johnson",
        "dateOfBirth": "1985-03-10T00:00:00",
        "biography": "A seasoned performer known for dynamic roles in drama and sci-fi."
      },
      {
        "id": 2,
        "name": "Brandon Eastwood",
        "dateOfBirth": "1978-11-23T00:00:00",
        "biography": "Well-known for his gritty portrayals in action films throughout the 2000s."
      },
      {
        "id": 3,
        "name": "Chloe Martins",
        "dateOfBirth": "1992-07-02T00:00:00",
        "biography": "A rising star who has garnered critical acclaim for indie film performances."
      },
      {
        "id": 4,
        "name": "Daniel Kim",
        "dateOfBirth": "1980-01-15T00:00:00",
        "biography": "Known for his powerful supporting roles and stage work on Broadway."
      },
      {
        "id": 5,
        "name": "Evelyn Brooks",
        "dateOfBirth": "1987-09-11T00:00:00",
        "biography": "Award-winning actress with a strong background in comedy and romance genres."
      }
    ];
    setActors(mockData);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Movies
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="actors table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Biography</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {actors.map((actor) => (
              <TableRow
                key={actor.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{actor.id}</TableCell>
                <TableCell>{actor.name}</TableCell>
                <TableCell>{formatDate(actor.dateOfBirth)}</TableCell>
                <TableCell>{actor.biography}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MoviesDashboard; 