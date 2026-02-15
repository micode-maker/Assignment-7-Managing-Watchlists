import { useEffect, useState } from 'react';

const FAVORITES_KEY = 'favoriteMovies';

function MovieCard({ movie, onFavoritesChange }) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    const isMovieFavorited = favorites.some((fav) => fav.id === movie.id);
    setFavorited(isMovieFavorited);
  }, [movie.id]);

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    const isMovieFavorited = favorites.some((fav) => fav.id === movie.id);

    let updatedFavorites = favorites;
    if (isMovieFavorited) {
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
      setFavorited(false);
    } else {
      updatedFavorites = [...favorites, movie];
      setFavorited(true);
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    if (onFavoritesChange) {
      onFavoritesChange(updatedFavorites);
    }
  };
  
const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/300x450/667eea/ffffff?text=No+Image";
const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A';

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src={posterUrl}
          alt={movie.title}
        />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-details">
          <span className="movie-rating">⭐ {movie.vote_average}</span>
          <span className="movie-year">{releaseYear}</span>
        </div>
        <button
          className={`favorite-button ${favorited ? 'favorited' : ''}`}
          onClick={handleToggleFavorite}
        >
          {favorited ? '♥ Remove Favorite' : '♡ Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
