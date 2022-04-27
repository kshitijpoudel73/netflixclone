import React, { useEffect, useState } from "react";
import instance from "./axios";
import "./Row.css";
import movieTrailer from "movie-trailer";
import ReactPlayer from "react-player";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState();
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        await instance.get(`${fetchUrl}`).then((res) => {
          console.log(res.data.results);
          setMovies(res.data.results);
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    let newurl = [];
    movieTrailer(movie?.title || " ")
      .then((url) => {
        console.log(url);
        newurl.push(url);
        console.log(newurl);
        setTrailerUrl(newurl);
        setLoaded(!isLoaded);
        newurl = [];
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {isLoaded ? <ReactPlayer url={trailerUrl} /> : null}
      {/* "XtMThy8QKqU" */}
    </div>
  );
}

export default Row;
