import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Typography, AppBar, Toolbar, Button, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import SignIn from './components/SignIn';

function App() {
  const [data] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      const results = await axios.get("https://localhost:3000/rest");
      console.log(results);
    };

    void fetchBook();
  }, []);

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  return (
    <Router>
      <div style={{ backgroundColor: '#fff', height: '100vh', margin: 0 }}>
        {/* Navbar mit Searchbar */}
        <AppBar
          position="static"
          style={{ backgroundColor: '#f5f5f5', color: '#000', boxShadow: 'none' }}
        >
          <Toolbar>
            {/* Titel */}
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Buch Projekt
            </Typography>

            {/* MUI Buttons */}
            <Button color="inherit" component={Link} to="/signin">Sign In</Button>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/about">About</Button>
            <Button color="inherit" component={Link} to="/contact">Contact</Button>

            {/* Searchbar */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Suchen…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Toolbar>
        </AppBar>

        {/* Inhalt */}
        <Container style={{ padding: '20px' }}>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<div>Home Page</div>} />
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
