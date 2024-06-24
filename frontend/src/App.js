import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import SearchPage from './SearchPage';

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
  },
  {
    "finalScore": 18.218147412227555,
    "description": "Singapore from The World Bank: Data",
    "title": "Singapore | Data",
    "pagerank": 5.104360391566659E-6,
    "url": "https://data.worldbank.org/country/singapore?view=chart"
  },
  {
    "finalScore": 16.649161709475894,
    "description": "Population, male - Singapore from The World Bank: Data",
    "title": "Population, male - Singapore | Data",
    "pagerank": 8.079231731282624E-6,
    "url": "https://data.worldbank.org/indicator/SP.POP.TOTL.MA.IN?locations=SG"
  },
  {
    "finalScore": 16.649161709475894,
    "description": "Population, female - Singapore from The World Bank: Data",
    "title": "Population, female - Singapore | Data",
    "pagerank": 8.079231731282624E-6,
    "url": "https://data.worldbank.org/indicator/SP.POP.TOTL.FE.IN?locations=SG"
  },
  {
    "finalScore": 16.64916130551431,
    "description": "Gini index - Singapore from The World Bank: Data",
    "title": "Gini index - Singapore | Data",
    "pagerank": 7.069327764872295E-6,
    "url": "https://data.worldbank.org/indicator/SI.POV.GINI?locations=SG"
  },
  {
    "finalScore": 16.64916058461398,
    "description": "Population, total - Singapore from The World Bank: Data",
    "title": "Population, total - Singapore | Data",
    "pagerank": 5.267076945030601E-6,
    "url": "https://data.worldbank.org/indicator/SP.POP.TOTL?locations=SG"
  },
  {
    "finalScore": 16.64916058461398,
    "description": "Net migration - Singapore from The World Bank: Data",
    "title": "Net migration - Singapore | Data",
    "pagerank": 5.267076945030601E-6,
    "url": "https://data.worldbank.org/indicator/SM.POP.NETM?locations=SG"
  },
  {
    "finalScore": 15.964841088459195,
    "description": "Population growth (annual %) - Singapore from The World Bank: Data",
    "title": "Population growth (annual %) - Singapore | Data",
    "pagerank": 5.267076945030601E-6,
    "url": "https://data.worldbank.org/indicator/SP.POP.GROW?locations=SG"
  }
];

function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      // try {
      //   const response = await fetch(`https://api.example.com/search?q=${query}`);
      //   const results = await response.json();
      //   navigate('/search', { state: { results } });
      // } catch (error) {
      //   console.error('Error fetching search results:', error);
      // }

      // For mock data:
      const filteredResults = mock_data.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      navigate(`/search?q=${encodeURIComponent(query)}`, { state: { results: mock_data } });
    }
  };

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + mock_data.map(entry => Object.values(entry).join(',')).join('\n');

    // Create a Blob object and initiate download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      {/* Main Content Section */}
      <main>
        <img id="google_image" src="https://media.geeksforgeeks.org/wp-content/uploads/20240120152553/social-(1).png" alt="Google" />

        {/* Search Input Section */}
        <section className="search-input-section">
          <div className="search-input-container">
            <img src="https://media.geeksforgeeks.org/wp-content/uploads/20240122040847/search.png" alt="google-search-btn" className="gsb" />
            <input
              type="text"
              placeholder="Search Word Bank Open Data or type a URL"
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        </section>

        {/* Buttons Section */}
        <section className="buttons-section">
          <button className="data-search-btn">
            Data Search
          </button>
          <button className="download-raw-data-btn">
            Download the Raw Data
          </button>
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
