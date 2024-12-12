import {
  Button,
  Box,
  Paper,
  TextField,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import PropTypes from 'prop-types';

interface SearchBookButtonProps {
  onSearch: (criteria: { isbn: string; title: string; rating: string; tsChecked: boolean; jsChecked: boolean; format: string }) => void;
}

const SearchBookButton: React.FC<SearchBookButtonProps> = ({ onSearch }) => {
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [tsChecked, setTsChecked] = useState(false);
  const [jsChecked, setJsChecked] = useState(false);
  const [format, setFormat] = useState('');

  const handleSearch = () => {
    const criteria = {
      isbn,
      title,
      rating: rating ? rating.toString() : '',
      tsChecked,
      jsChecked,
      format,
    };
    onSearch(criteria);
  };

  const handleReset = () => {
    setIsbn('');
    setTitle('');
    setRating(null);
    setTsChecked(false);
    setJsChecked(false);
    setFormat('');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', width: '300px' }}>
        <TextField
          label="ISBN"
          variant="outlined"
          fullWidth
          value={isbn}
          onChange={(e) => {
            setIsbn(e.target.value);
          }}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Titel"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          style={{ marginBottom: '10px' }}
        />
        <Box style={{ marginBottom: '10px' }}>
          <FormLabel component="legend">Rating</FormLabel>
          <Rating
            name="search-rating"
            value={rating}
            precision={0.5}
            onChange={(_event, newValue) => {
              setRating(newValue);
            }}
          />
        </Box>
        <FormControlLabel
          control={<Checkbox checked={tsChecked} onChange={(e) => { setTsChecked(e.target.checked); }} />}
          label="TS"
        />
        <FormControlLabel
          control={<Checkbox checked={jsChecked} onChange={(e) => { setJsChecked(e.target.checked); }} />}
          label="JS"
        />
        <FormControl component="fieldset" style={{ marginTop: '10px' }}>
          <FormLabel component="legend">Art</FormLabel>
          <RadioGroup
            row
            value={format}
            onChange={(e) => {
              setFormat(e.target.value);
            }}
          >
            <FormControlLabel value="HARDCOVER" control={<Radio />} label="Hardcover" />
            <FormControlLabel value="EPUB" control={<Radio />} label="EPUB" />
            <FormControlLabel value="PAPERBACK" control={<Radio />} label="Paperback" />
          </RadioGroup>
        </FormControl>
        <Button variant="outlined" onClick={handleSearch} fullWidth style={{ marginTop: '20px' }}>
          Search
        </Button>
        <Button variant="outlined" onClick={handleReset} fullWidth style={{ marginTop: '10px' }}>
          Zurücksetzen
        </Button>
      </Paper>
    </Box>
  );
};

SearchBookButton.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBookButton;
