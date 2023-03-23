import styled from 'styled-components';

export const CastList = styled.ul`
list-style: none;
display: grid;
max-width: 1800px;
grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
grid-auto-rows: 300px;
grid-gap: 12px;
justify-content: center;
margin-left: auto;
margin-right: auto;
margin-top: 20px;

`;
export const CastItem = styled.li`
  margin: 10px 0 16px;
  padding: 2px 8px;
  //box-shadow: 1px 2px 4px 3px rgba(0, 0, 0, 0.5);
`;
export const Name = styled.h3`
  margin: 8px 0;
`;
export const Character = styled.p`
  margin: 0;
`;