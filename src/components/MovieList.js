import { MovieName, MovieLi, MovieLink } from './MovieList.styled';
import { useLocation } from 'react-router-dom';

export const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul>
      {movies.map(movie => (
        <MovieLi key={movie.id}>
          <MovieLink to={`/movies/${movie.id}`} state={{ from: location }}>
            <MovieName>{movie.title}</MovieName>
          </MovieLink>
        </MovieLi>
      ))}
    </ul>
  );
};
