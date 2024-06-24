import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SearchPage.css';

// Mock data for demonstration
const mock_data = [
  {
    "finalScore": 21.72992344777316,
    "description": "GDP (current US$) - Singapore from The World Bank: Data",
    "title": "GDP (current US$) - Singapore | Data",
    "pagerank": 5.267076945030601E-6,
    "url": "https://data.worldbank.org/indicator/NY.GDP.MKTP.CD?locations=SG"
  },
  {
    "finalScore": 21.7299222566199,
    "description": "GDP growth (annual %) - Singapore from The World Bank: Data",
    "title": "GDP growth (annual %) - Singapore | Data",
    "pagerank": 2.2891937986585505E-6,
    "url": "https://data.worldbank.org/indicator/NY.GDP.MKTP.KD.ZG?locations=SG"
  },
  {
    "finalScore": 18.218169488769647,
    "description": "Singapore from The World Bank: Data",
    "title": "Singapore | Data",
    "pagerank": 6.029571561961642E-5,
    "url": "https://data.worldbank.org/country/singapore?locations=SG"
  }
];

function SearchPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q');
  const { results } = location.state || { results: [] };
  const [query, setQuery] = useState(initialQuery || '');
  const navigate = useNavigate();

  // Update the query state when the URL changes
  useEffect(() => {
    const currentQuery = searchParams.get('q');
    if (currentQuery !== query) {
      setQuery(currentQuery || '');
    }
  }, [location.search]);

  const handleSearch = () => {
    if (query.trim() !== '') {
      // Perform the search here in a real application
      navigate(`/search?q=${encodeURIComponent(query)}`, { state: { results: mock_data } });
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-page">
      {/* Google-like Navigation Bar */}
      <nav className="google-navigation">
        <div className="google-logo">
          <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google Logo" />
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Word Bank Open Data or type a URL"
            className="google-search-input"
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress} // Handle Enter key press
          />
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20240122040847/search.png"
            alt="google-search-btn"
            className="gsb"
            onClick={handleSearch} // Handle button click
          />
        </div>
      </nav>

      {/* Display Search Results */}
      <div className="search-results">
        <div className="results-header">
          <h2>About {results.length} results</h2>
        </div>
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="search-result">
              <a href={result.url} target="_blank" rel="noopener noreferrer">
                <div className="result-title">{result.title}</div>
                <div className="result-url">{result.url}</div>
                <div className="result-description">{result.description}</div>
              </a>
            </div>
          ))
        ) : (
          <div className="no-results">No results found</div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
