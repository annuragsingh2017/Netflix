import React from "react";
import styled from "styled-components";

import { useEffect, useState } from "react";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid lightgreen;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 352px;
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
  flex-direction: column;
  justify-content: space-between;
`;
const MovieInformation = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.5;
  }
`;
const API_KEY = "6453f7e7";
function MovieInfo(props) {
  console.log(props)
  const { selectMovie } = props;
  const [state, setState] = useState([]);
  const  fetchData=async()=>{
    const response = await fetch(
      `https://www.omdbapi.com/?i=${selectMovie}&apikey=${API_KEY}`
    );
    const data = await response.json();
    // console.log(data);
    setState(data);
  }
  useEffect(() => {
    fetchData()
  }, [state]);
  
  return (
    <Container>
      {state && (
        <div>
          <CoverImage src={state.Poster} />
          <MovieName>
            <h1>Movie Name:{state.Title}</h1>
          </MovieName>
          <InfoColumn>
            <MovieInformation>
              Released Date: <span>{state?.Released}</span>
            </MovieInformation>
            <MovieInformation>
              IMDB Rating: <span>{state?.imdbRating}</span>
            </MovieInformation>

            <MovieInformation>
              {" "}
              Actors: <span>{state?.Actors}</span>
            </MovieInformation>
            <MovieInformation>
              Director: <span>{state?.Director}</span>
            </MovieInformation>
          </InfoColumn>
        </div>
      )}
    </Container>
  );
}

export default MovieInfo;
