import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: '#f5f5f5',
        color: '#000',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <LocalLibraryIcon />
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/search-results">
            Search
          </Button>
          <Button color="inherit">Create</Button>
        </Box>
        <Box
          sx={{
            border: '1px solid #000',
            borderRadius: '4px',
            padding: '4px 8p6x',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Button color="inherit" component={Link} to="/signin">
            Sign In
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
