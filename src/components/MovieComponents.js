import React from "react";
import styled from "styled-components";
const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10 px;
  width: 280px;
  box-shadow: 0 3px 10px 0 green;
  cursor: pointer;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;
const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;

function MovieComponents(props) {
   console.log(props);
  return (
    <MovieContainer
      onClick={() => {
        // console.log(props.movie.Title, props.movie.imdbID);
        return props.onSelectMovie(props.movie.imdbID);
      }}
    >
      <CoverImage src={props.movie.Poster} />
      <MovieName>{props.movie.Title}</MovieName>
      <InfoColumn>
        <MovieInfo>{props.movie.Type}</MovieInfo>
        <MovieInfo>{props.movie.Year}</MovieInfo>
      </InfoColumn>
    </MovieContainer>
  );
}

export default MovieComponents;
