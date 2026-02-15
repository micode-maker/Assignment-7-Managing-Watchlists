import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { searchMovies } from './services/movieService';
import './App.css';

import { MovieProvider } from './contexts/MovieContext';
import Watchlist from './pages/WatchList';


function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleSearch = async (query) => {
    const trimmed = query.trim();
    setSearchQuery(query);
    if (!trimmed) {
      setMovies([]);
      setSearchLoading(false);
      setSearchError(null);
      return;
    }

    setSearchLoading(true);
    setSearchError(null);
    try {
      const results = await searchMovies(trimmed);
      setMovies(results);
    } catch (error) {
      setSearchError(error.message || 'Failed to search movies');
      setMovies([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setMovies([]);
    setSearchLoading(false);
    setSearchError(null);
  };

  return (
    <MovieProvider>
    <Router>
      <div className="app">
        <Header onSearch={handleSearch} onClearSearch={handleClearSearch} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                movies={movies}
                setMovies={setMovies}
                searchQuery={searchQuery}
                searchLoading={searchLoading}
                searchError={searchError}
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </div>
    </Router>
    </MovieProvider>
  );
};

export default App;
