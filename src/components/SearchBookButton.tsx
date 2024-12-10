import { Button, Box, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

interface SearchBookButtonProps {
  onSearch: (query: string) => void;
}

const SearchBookButton: React.FC<SearchBookButtonProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper elevation={3} style={{ padding: '40px', textAlign: 'center', width: '300px' }}>
        <TextField
          label="Search Books"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => { setQuery(e.target.value); }}
          style={{ marginBottom: '20px' }}
        />
        <Button variant="outlined" onClick={handleSearch} fullWidth>Search</Button>
      </Paper>
    </Box>
  );
};
SearchBookButton.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBookButton;
