import React, { useState } from "react";
import styled from "styled-components";
import MovieComponents from "./components/MovieComponents";
import MovieInfo from "./components/MovieInfo";
import classes from './App.module.css'
import logo from './logo12.png'
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;

  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly; ;
`;
const API_KEY = "6453f7e7";
function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, setMovieLiest] = useState([]);
  const [selectMovie, onSelectMovie] = useState();
  const [dark,setDark]=useState(false)
  const [addItem,setItem]=useState(0)
  const [movie,setMovie]=useState([])
  const [show,setShow]=useState(false)
  const fetchData = async (searchString) => {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    console.log(response);
    const data = await response.json();
    setMovieLiest(data.Search);
    console.log(data.Search);
    console.log(movieList);
  };
  const onTextChange = (event) => {
    clearTimeout(timeoutId);

    updateSearchQuery(event.target.value);

    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    updateTimeoutId(timeout);
  };
  const addMovie=(e)=>{
    var j=addItem;
    j++;
   setItem(j)
   setMovie([...movie,movieList[e.target.value]])
  
  }
  const showWatchLater=()=>{
      setShow(!show)
  }
  
  return (
    <Container>
      <Header>
        <AppName>React Movie App</AppName>
        <button  className={classes.btn} onClick={showWatchLater}>Watch Later : <strong>{addItem}</strong><img className={classes.img}src={logo}/></button>
        <SearchBox>
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
        <div>
        <label className={classes.switch}>
          <input type="checkbox" 
          onClick={()=>{
           
            setDark(!dark) 
            console.log(dark)   
           return dark }}
          />
          <span  className={`${classes.slider} ${classes.round}`}></span>
        </label>
      </div>
      </Header>

      {show? <MovieListContainer >{movie?.length ? (
          movie.map((movie, index) => {
            return (
              <div>
              <MovieComponents
                key={index}
                movie={movie}
                
              />
              </div>
            );
          })
        ) : (
          <h1>No Search Movie </h1>
        )}</MovieListContainer>:<div>{ dark ? <div className={classes.dark}>
      {selectMovie &&<div> <MovieInfo selectMovie={selectMovie}></MovieInfo>
      </div>}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => {
            return (
              <div>
              <MovieComponents
                key={index}
                movie={movie}
                onSelectMovie={onSelectMovie}
              /><button value={index}onClick={addMovie}>Add Watch to Later </button>
              </div>
            );
          })
        ) : (
          <h1>No Search Movie </h1>
        )}
      </MovieListContainer>

      </div>:<div>{selectMovie && <MovieInfo selectMovie={selectMovie} />}
             <MovieListContainer>
               {movieList?.length ? (
                 movieList.map((movie, index) => {
                   return (<div >
                     <MovieComponents
                       key={index}
                       movie={movie}
                       onSelectMovie={onSelectMovie}
                     /><button value={index} onClick={addMovie}>Add Watch to Later</button> </div>
                   );
                 })
               ) : (
                 <h1>No Search Movie </h1>
               )}
             </MovieListContainer>
             </div>
      }</div>}
    </Container>
  );
}

export default App;
