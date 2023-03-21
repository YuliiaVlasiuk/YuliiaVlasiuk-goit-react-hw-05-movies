import styled from "styled-components";
import { Link } from 'react-router-dom';

export const MovieName = styled.h3`
  padding: 4px;
  margin-top: 8px;
  margin-bottom: 0;
  color: black;
  margin-bottom: 0;
`;

export const MovieLink = styled(Link)`
  text-decoration: none;
   &:hover {
    border-radius: 5px;
    box-shadow: 1px 2px 4px 3px rgba(0, 0, 0, 0.5);
  }
`;
export const MovieLi = styled.li`
 
  &:hover {
    border-radius: 5px;
    box-shadow: 1px 2px 4px 3px rgba(0, 0, 0, 0.5);
  }
  
`;

