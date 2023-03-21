import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { CastItem, CastList, Character, Name } from './Cast.styled';


import axios from 'axios';
const API_KEY = '7fcadb4f45c26a7f0b88a5d0e3a0d367';



const Cast = () => {


  const [movieCast, setMovieCast] = useState([]);

  const { movieId } = useParams();


  const getCast = async id => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    );
    return response.data;
  };

   
  useEffect(() => {
    getCast(movieId).then(data => setMovieCast(data.cast));
  }, [movieId]);
  
  return (
    <CastList>
      {movieCast.length > 0
        ? movieCast.map(({ id, name, profile_path, character }) => (
            <CastItem key={id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                alt="actor"
                loading="lazy"
                width={120}
              />
              <Name>{name}</Name>
              <Character> Character: {character}</Character>
            </CastItem>
          ))
        : "Sorry, there isn't any info :("}
    </CastList>
  );

  // return (
  //   <section>
  //     <div>
  //       <h2>First review - 4.6/5</h2>
         
  //       <p>
  //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
  //         nihil ea, eaque fugit amet possimus officiis asperiores aperiam facere
  //         et?
  //       </p>
  //     </div>
  //   </section>
  // );

  
};

export default Cast;