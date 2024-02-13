import { useEffect, useState } from "react";
import { Navbar } from "./Components/Navbar/NavBar";
import { Search } from "./Components/Navbar/Search";
import { NumResult } from "./Components/Navbar/NumResult";
import { Main } from "./Components/Main/Main";

import { MovieList } from "./Components/Main/ListBox/MovieList";
import { Box } from "./Components/Main/Box";
import { WatchedSummary } from "./Components/Main/WatchedBox/WatchedSummary";
import { WatchedMoviesList } from "./Components/Main/WatchedBox/WatchedMoviesList";
import { ErrorMessage } from "./Components/ErrorMessage";
import { Loader } from "./Components/Loader";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "2666e1f5";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovies() {
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
    }

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
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          <WatchedSummary watched={watched} average={average} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
