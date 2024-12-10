import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
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
        <Button color="inherit" component={Link} to="/about">Search</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
