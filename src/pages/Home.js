import { useState, useEffect } from 'react';
import { MovieList } from '../components/MovieList';

import axios from 'axios';
const API_KEY = '7fcadb4f45c26a7f0b88a5d0e3a0d367';

export const Home = () => {
  const [movies, setMovies] = useState([]);

  async function getMovies() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <main>
      <MovieList movies={movies} />
    </main>
  );
};

export default Home;
