import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.scss';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    // Trigger search on Enter key
    if (e.key === 'Enter') {
      const trimmedQuery = searchQuery.trim();
      if (trimmedQuery) {
        // Navigate to search results page with the query
        navigate(`/home/search/${encodeURIComponent(trimmedQuery)}`);
        // Optional: Reset search input
        setSearchQuery('');
      }
    }
  };

  return (
    <div className="search-box-wrapper">
      <span className="material-symbols-outlined">search</span>
      <input
        type="search"
        placeholder="Search researchers..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
