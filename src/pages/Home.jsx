import { useState, useEffect } from "react";
import MovieGrid from "../components/MovieGrid";
import { getPopularMovies } from "../services/movieService";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function Home({ movies, setMovies, searchQuery, searchLoading, searchError }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (movies.length === 0 && !searchQuery.trim()) {
      async function loadMovies() {
        setLoading(true);
        setError(null);
        try {
          const data = await getPopularMovies();
          setMovies(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      loadMovies();
    }
  }, [movies, setMovies, searchQuery]);

  if (searchQuery.trim() && searchLoading) return <LoadingSpinner message="Searching movies..." />;
  if (searchQuery.trim() && searchError) return <ErrorMessage message={searchError} />;
  if (loading) return <LoadingSpinner message="Loading movies..." />;
  if (error) return <ErrorMessage message={error} />;

  const isSearching = searchQuery.trim().length > 0;

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{isSearching ? "Search Results" : "Popular Movies"}</h2>
        <p>{isSearching ? "Browse movies matching your search" : "Discover and save your favorite films"}</p>
      </div>

      {movies.length > 0 ? (
        <MovieGrid movies={movies} />
      ) : (
        <div className="empty-state">
          <p>No movies found. Try again.</p>
        </div>
      )}
    </main>
  );
}

export default Home;
