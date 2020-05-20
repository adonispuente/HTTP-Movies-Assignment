import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import MovieCard from "./MovieCard";

const UpdateMovie = (props) => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const changeHandler = (ev) => {
    ev.persist();
    let value = ev.target.value;

    setMovie({
      ...movie,
      [ev.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        // res.data
        console.log("we done did it!", res);
        props.setMovie(res.data);
        // debugger;
        push(`/movies/${id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <form>
        <h2>Update Item</h2>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={movie.title}
        />
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movie.director}
        />
        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movie.metascore}
        />
        {movie.stars.map((star) => (
          <input
            key={movie.id}
            type="text"
            name="star"
            onChange={changeHandler}
            placeholder="star"
            value={star}
          />
        ))}
        <button onClick={handleSubmit}> Update Movie </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
