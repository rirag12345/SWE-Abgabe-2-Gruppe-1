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
    <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', width: '300px' }}>
        <Button variant="outlined" onClick={handleSearch} fullWidth>Search</Button>
      </Paper>
    </Box>
  );
};

SearchBookButton.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBookButton;
