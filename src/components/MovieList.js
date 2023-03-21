import { MovieName, MovieLi, MovieLink } from './MovieList.styled';

export const MovieList = ({ movies }) => {
  return (
    <ul>
      {movies.map(movie => (
        <MovieLi key={movie.id}>
          <MovieLink to={`/movies/${movie.id}`}>
            <MovieName>{movie.title}</MovieName>
          </MovieLink>
        </MovieLi>
      ))}
    </ul>
  );
};
