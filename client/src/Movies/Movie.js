import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();
  const { id } = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteItem = (e) => {
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then((res) => {
        // res.data
        console.log(res);
        // props.setItems(res.data);
        push("/");
        const newMovies = props.MovieList.filter((v) => `${v.id}` !== res.data);
        props.setMovieList(newMovies);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button
        onClick={() => {
          push(`/updated-movie/${id}`);
        }}
      >
        {" "}
        Update Movie
      </button>
      <button onClick={() => deleteItem()}> Delete Movie </button>
    </div>
  );
}

export default Movie;
