import { useEffect, useState } from 'react';
import MovieGrid from '../components/MovieGrid';

const FAVORITES_KEY = 'favoriteMovies';

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    setFavoriteMovies(savedFavorites);
  }, []);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Favorites</h2>
        <p>Your favorited movies</p>
      </div>
      {favoriteMovies.length > 0 ? (
        <MovieGrid movies={favoriteMovies} onFavoritesChange={setFavoriteMovies} />
      ) : (
        <div className="empty-state">
          <p>No favorite movies yet. Go add some!</p>
        </div>
      )}
    </main>
  );
};

export default Favorites;
