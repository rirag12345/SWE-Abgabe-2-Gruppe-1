import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

const Navbar = () => {
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: '#f5f5f5', color: '#000', boxShadow: 'none' }}
    >
      <Toolbar>
        {/* Icon */}
        <LocalLibraryIcon />

        {/* MUI Buttons */}
        <Button color="inherit" component={Link} to="/signin">Sign In</Button>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/search-results">Search</Button>
        <Button color="inherit" component={Link} to="/search-results">Create</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
