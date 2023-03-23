import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CastItem, CastList, Character, Name } from './Cast.styled';

import axios from 'axios';
const API_KEY = '7fcadb4f45c26a7f0b88a5d0e3a0d367';
const BASE_URL = `https://api.themoviedb.org/3/`;

const Cast = () => {
  const [movieCast, setMovieCast] = useState([]);
  const { movieId } = useParams();

  async function getCast(id) {
    try {
      const response = await axios.get(
        `${BASE_URL}movie/${id}/credits?api_key=${API_KEY}&language=en-US`
      );
      setMovieCast(response.data.cast);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCast(movieId);
  }, [movieId]);

 return (
    <CastList>
      {movieCast.length > 0
        ? movieCast.map(({ id, name, profile_path, character }) => (
            <CastItem key={id}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w200${profile_path}`
                    : `https://as2.ftcdn.net/v2/jpg/03/15/18/09/1000_F_315180932_rhiXFrJN27zXCCdrgx8V5GWbLd9zTHHA.jpg`
                }
                alt="actor"
                loading="lazy"
                width={150}
                height={200}
              />
              <Name>{name}</Name>
              <Character> Character: {character}</Character>
            </CastItem>
          ))
        : 'There is no information about cast members'}
    </CastList>
  );
};

export default Cast;
