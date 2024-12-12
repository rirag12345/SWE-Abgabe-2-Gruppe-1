import { Button, Box, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

interface SearchBookButtonProps {
  onSearch: (criteria: { isbn: string; title: string; rating: string }) => void;
}

const SearchBookButton: React.FC<SearchBookButtonProps> = ({ onSearch }) => {
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');

  const handleSearch = () => {
    const criteria = {
      isbn,
      title,
      rating,
    };
    onSearch(criteria);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', width: '300px' }}>
        <TextField
          label="ISBN"
          variant="outlined"
          fullWidth
          value={isbn}
          onChange={(e) => { setIsbn(e.target.value); }}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Titel"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => { setTitle(e.target.value); }}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Rating"
          variant="outlined"
          fullWidth
          value={rating}
          onChange={(e) => { setRating(e.target.value); }}
          style={{ marginBottom: '10px' }}
        />
        <Button variant="outlined" onClick={handleSearch} fullWidth style={{ marginTop: '20px' }}>Search</Button>
      </Paper>
    </Box>
  );
};

SearchBookButton.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBookButton;
