import React, { useState } from 'react';
import './App.css';

function App() {
  // Mock data structure similar to the API response
  const mockData = [
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

  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // const response = await fetch('http://localhost:8080/query');
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      // const result = await response.json();
      // setData(result);
      setData(mockData); 
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>World Bank Info Retrieval</h1>
        <button onClick={fetchData}>Fetch Data</button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Final Score</th>
              <th>PageRank</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.finalScore}</td>
                <td>{item.pagerank}</td>
                <td>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.url}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
