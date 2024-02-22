import { useEffect, useState } from "react";
import { Navbar } from "./Components/Navbar/NavBar";
import { Search } from "./Components/Navbar/Search";
import { NumResult } from "./Components/Navbar/NumResult";
import { Main } from "./Components/Main/Main";

import { MovieList } from "./Components/Main/ListBox/MovieList";
import { Box } from "./Components/Main/Box";
import { WatchedSummary } from "./Components/Main/WatchedBox/WatchedSummary";
import { WatchedMoviesList } from "./Components/Main/WatchedBox/WatchedMoviesList";
import { SelectedMovies } from "./Components/SelectedMovies";

const KEY = "2666e1f5";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      setError("");
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
      );

      if (!res.ok) throw new Error("Something went wrong");

      const data = await res.json();

      if (data.Response === "False") throw new Error("Movie Not Found!");

      setMovies(data.Search);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();
  }, [query]);

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading ? (
            <p className="loader">Loading...</p>
          ) : error ? (
            <p className="error">
              <span>&times;</span> {error}
            </p>
          ) : (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <SelectedMovies
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
