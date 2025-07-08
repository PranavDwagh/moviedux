import { React, useState, useEffect } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function MoviesGrid({ watchlist, movies, toggleWatchlist }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("All Genres");
  const [rating, setRating] = useState("All");

  //   useEffect(()=>{
  //       const m = ["POP", "SOS", "MI-8"];
  //       setMovies(m);
  //       console.log("Use Effect Running");
  //   }, [])
  //============================
  // Never call setFun like this - THis will cause infinite loop as
  //   const m = ["POP", "SOS", "MI-8"];
  //   setMovies(m);

  //======================

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); //By this way we are we are updating the state of component and UI is forced to update
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const matchesRating = (movie, rating) => {
    switch (rating) {
      case "good":
        return movie.rating >= 8;
      case "bad":
        return movie.rating < 8 && movie.rating >= 5;
      case "All":
        return true;
      default:
        return false;
    }
  };

  const matchesGenre = (movie, genre) => {
    return (
      genre === "All Genres" ||
      movie.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  const matchesSearchTerm = (movie, searchTerm) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()); // filtering movie

  const filteredMovies = movies.filter((movie) => {
    return (
      matchesGenre(movie, genre) &&
      matchesRating(movie, rating) &&
      matchesSearchTerm(movie, searchTerm)
    );
  });

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Serach your movie here..."
        value={searchTerm} // not really required
        onChange={handleSearchChange}
      />

      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre </label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={handleGenreChange}
          >
            <option value="All Genres">All Genres</option>
            <option value="action">Action</option>
            <option value="drama">Drama</option>
            <option value="horror">Horror</option>
            <option value="fantacy">Fantacy</option>
          </select>
        </div>

        <div className="filter-slot">
          <label>Rating </label>
          <select
            className="filter-dropdown"
            value={rating}
            onChange={handleRatingChange}
          >
            <option value="All">All</option>
            <option value="good">Good</option>
            <option value="bad">Bad</option>
          </select>
        </div>
      </div>

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard toggleWatchlist={toggleWatchlist} isWatchlisted={watchlist.includes(movie.id)} movie={movie} key={movie.id}></MovieCard>
        ))}
      </div>
    </div>
  );
}
