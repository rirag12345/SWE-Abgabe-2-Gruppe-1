import { Button, Box, Paper } from '@mui/material';
import PropTypes from 'prop-types';

interface SearchBookButtonProps {
  onSearch: () => void;
}

const SearchBookButton: React.FC<SearchBookButtonProps> = ({ onSearch }) => {
  const handleSearch = () => {
    onSearch();
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper elevation={3} style={{ padding: '40px', textAlign: 'center', width: '300px' }}>
        <Button variant="outlined" onClick={handleSearch} fullWidth>Search</Button>
      </Paper>
    </Box>
  );
};

SearchBookButton.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBookButton;
