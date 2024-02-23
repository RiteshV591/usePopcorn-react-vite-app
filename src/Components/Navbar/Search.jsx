import { useEffect, useRef } from "react";

export const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  const inputFocus = (e) => {
    if (document.activeElement === inputEl.current) return;

    if (e.code === "Enter") {
      inputEl.current.focus();
      setQuery("");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", inputFocus);

    return () => document.addEventListener("keydown", inputFocus);
  }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};
