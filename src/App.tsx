import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import SearchResults from './pages/searchResults';

function App() {
  const [data] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      const results = await axios.get("https://localhost:3000/rest");
      console.log(results);
    };

    void fetchBook();
  }, []);

  return (
    <Router>
      <div style={{ backgroundColor: '#fff', height: '100vh', margin: 0 }}>
        {/* Navbar mit Searchbar */}
        <Navbar />

        {/* Inhalt */}
        <Container style={{ padding: '20px' }}>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<div>Sie sind auf der Startseite!</div>} />
            <Route path="/search-results" element={<SearchResults />} />
            {/* Weitere Routen hier */}
          </Routes>

          {/* JSON-Daten */}
          <div>{JSON.stringify(data)}</div>
        </Container>
      </div>
    </Router>
  );
}

export default App;
