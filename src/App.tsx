import { Container } from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { SignIn } from './components/Sign-in';
import { BookDetails } from './features/search/book-details';
import { SearchResults } from './features/search/search-results';

export const App = () => {
  return (
    <Router>
      <div style={{ backgroundColor: '#fff', height: '100vh', margin: 0 }}>
        <Navbar />

        <Container style={{ padding: '20px' }}>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<div>Sie sind auf der Startseite!</div>} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/book-details/:isbn" element={<BookDetails />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};
