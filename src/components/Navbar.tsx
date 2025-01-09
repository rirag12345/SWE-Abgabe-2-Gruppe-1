import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

interface NavbarProps {
    isAuthenticated: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
    Navbar.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
    };

    return (
        <AppBar
            position='static'
            style={{
                backgroundColor: '#f5f5f5',
                color: '#000',
                boxShadow: 'none',
            }}
        >
            <Toolbar>
                <AutoStoriesIcon />
                <Box sx={{ flexGrow: 1 }}>
                    <Button color='inherit' component={Link} to='/'>
                        Home
                    </Button>
                    <Button
                        color='inherit'
                        component={Link}
                        to='/search-results'
                    >
                        Search
                    </Button>
                    {isAuthenticated && (
                        <Button color='inherit' component={Link} to='/create'>
                            Create
                        </Button>
                    )}
                </Box>
                <Box
                    sx={{
                        border: '1px solid #000',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        backgroundColor: '#fff',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Button color='inherit' component={Link} to='/signin'>
                        Sign In
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
