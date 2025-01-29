import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Container, 
  Typography, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating as MuiRating,
  Stack,
  Box
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const MoviesDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [openActorsModal, setOpenActorsModal] = useState(false);
  const [openRatingsModal, setOpenRatingsModal] = useState(false);
  const [selectedMovieActors, setSelectedMovieActors] = useState([]);
  const [selectedMovieRatings, setSelectedMovieRatings] = useState([]);
  const [selectedMovieTitle, setSelectedMovieTitle] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/Movies', {
          headers: {
            'X-API-Key': 'your-secret-api-key-2024'
          }
        });
        setMovies(response.data);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies data');
      }
    };

    fetchMovies();
  }, []);

  const handleOpenActors = async (movieId, movieTitle) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/Movies/${movieId}/actors`, {
        headers: {
          'X-API-Key': 'your-secret-api-key-2024'
        }
      });
      setSelectedMovieActors(response.data);
      setSelectedMovieTitle(movieTitle);
      setOpenActorsModal(true);
    } catch (err) {
      console.error('Error fetching movie actors:', err);
      setError('Failed to load movie actors');
    }
  };

  const handleOpenRatings = async (movieId, movieTitle) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/Ratings/movie/${movieId}`, {
        headers: {
          'X-API-Key': 'your-secret-api-key-2024'
        }
      });
      setSelectedMovieRatings(response.data);
      setSelectedMovieTitle(movieTitle);
      setOpenRatingsModal(true);
    } catch (err) {
      console.error('Error fetching movie ratings:', err);
      setError('Failed to load movie ratings');
    }
  };

  const handleCloseActorsModal = () => {
    setOpenActorsModal(false);
    setSelectedMovieActors([]);
  };

  const handleCloseRatingsModal = () => {
    setOpenRatingsModal(false);
    setSelectedMovieRatings([]);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Movies
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="movies table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Release Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow
                key={movie.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{movie.id}</TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.description}</TableCell>
                <TableCell>{formatDate(movie.releaseDate)}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={() => handleOpenActors(movie.id, movie.title)}
                    >
                      View Actors
                    </Button>
                    <Button 
                      variant="contained" 
                      color="secondary"
                      onClick={() => handleOpenRatings(movie.id, movie.title)}
                    >
                      Ratings
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Actors Modal */}
      <Dialog
        open={openActorsModal}
        onClose={handleCloseActorsModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Actors in {selectedMovieTitle}
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>Biography</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedMovieActors.map((actor) => (
                  <TableRow key={actor.id}>
                    <TableCell>{actor.id}</TableCell>
                    <TableCell>{actor.name}</TableCell>
                    <TableCell>{formatDate(actor.dateOfBirth)}</TableCell>
                    <TableCell>{actor.biography}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseActorsModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Ratings Modal */}
      <Dialog
        open={openRatingsModal}
        onClose={handleCloseRatingsModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Ratings for {selectedMovieTitle}
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Rating</TableCell>
                  <TableCell>Review</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedMovieRatings.map((rating) => (
                  <TableRow key={rating.id}>
                    <TableCell>
                      <MuiRating
                        value={rating.rating}
                        readOnly
                        precision={0.5}
                      />
                    </TableCell>
                    <TableCell>{rating.review}</TableCell>
                    <TableCell>{formatDate(rating.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRatingsModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MoviesDashboard; 