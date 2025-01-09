import { Container } from '@mui/material';
import { useState } from 'react';
import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from 'react-router-dom';
import { Create } from './components/Create';
import { Navbar } from './components/Navbar';
import { SignIn } from './components/Sign-in';
import { BookDetails } from './features/search/book-details';
import { SearchResults } from './features/search/search-results';

export const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            <div
                style={{ backgroundColor: '#fff', height: '100vh', margin: 0 }}
            >
                <Navbar isAuthenticated={isAuthenticated} />

                <Container style={{ padding: '20px' }}>
                    <Routes>
                        <Route
                            path='/signin'
                            element={
                                <SignIn
                                    onSignIn={() => setIsAuthenticated(true)}
                                />
                            }
                        />
                        <Route
                            path='/'
                            element={<div>Sie sind auf der Startseite!</div>}
                        />
                        <Route
                            path='/search-results'
                            element={<SearchResults />}
                        />
                        <Route
                            path='/book-details/:isbn'
                            element={<BookDetails />}
                        />
                        <Route
                            path='/create'
                            element={
                                isAuthenticated ? (
                                    <Create />
                                ) : (
                                    <Navigate to='/signin' />
                                )
                            }
                        />
                    </Routes>
                </Container>
            </div>
        </Router>
    );
};
