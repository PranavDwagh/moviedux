import logo from "./logo.svg";
import "./App.css";
import Header from "./component/Header";
import MoviesGrid from "./component/MoviesGrid.js";
import Footer from "./component/Footer";
import Watchlist from "./component/Watchlist.js";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetch("movies.json")
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  const toggleWatchlist = (movieId) => {
    setWatchlist((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  return (
    <div className="App">
      <div className="container">
        <Header></Header>

        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/watchlist">Watchlist</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/"
              element={<MoviesGrid watchlist={watchlist} movies={movies} toggleWatchlist={toggleWatchlist} />}
            ></Route>
            <Route
              path="/watchlist"
              element={<Watchlist watchlist={watchlist} movies={movies} toggleWatchlist={toggleWatchlist}/>}
            ></Route>
          </Routes>
        </BrowserRouter>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
