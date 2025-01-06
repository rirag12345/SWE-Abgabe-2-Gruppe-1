import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { SearchCriteriaSchema } from '../auth/lib/validators';
import { SearchCriteria } from './types/search';
interface SearchBookButtonProps {
    onSearch: (criteria: SearchCriteria) => void;
}
export const SearchBookButton: React.FC<SearchBookButtonProps> = ({
    onSearch,
}) => {
    const [isbn, setIsbn] = useState('');
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState<number | null>(null);
    const [tsChecked, setTsChecked] = useState(false);
    const [jsChecked, setJsChecked] = useState(false);
    const [format, setFormat] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const handleSearch = () => {
        const criteria = {
            isbn,
            title,
            rating: rating ? rating.toString() : '',
            tsChecked,
            jsChecked,
            format,
        };

        const result = SearchCriteriaSchema.safeParse(criteria);
        if (!result.success) {
            setErrors(
                result.error.errors.map(
                    (error: { message: string }) => error.message,
                ),
            );
            return;
        }

        setErrors([]);
        onSearch(criteria);
    };

    const handleReset = () => {
        setIsbn('');
        setTitle('');
        setRating(null);
        setTsChecked(false);
        setJsChecked(false);
        setFormat('');
        setErrors([]);
    };

    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            style={{ marginTop: '20px', width: '100%' }}
        >
            <Paper
                elevation={3}
                style={{ padding: '20px', textAlign: 'center', width: '500px' }}
            >
                <TextField
                    label='ISBN'
                    variant='outlined'
                    fullWidth
                    value={isbn}
                    onChange={(e) => {
                        setIsbn(e.target.value);
                    }}
                    style={{ marginBottom: '10px' }}
                />
                <TextField
                    label='Titel'
                    variant='outlined'
                    fullWidth
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    style={{ marginBottom: '10px' }}
                />
                <Box style={{ marginBottom: '10px' }}>
                    <FormLabel component='legend'>Rating</FormLabel>
                    <Rating
                        name='search-rating'
                        value={rating}
                        precision={0.5}
                        onChange={(_event, newValue) => {
                            setRating(newValue);
                        }}
                    />
                </Box>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={tsChecked}
                            onChange={(e) => {
                                setTsChecked(e.target.checked);
                            }}
                        />
                    }
                    label='TS'
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={jsChecked}
                            onChange={(e) => {
                                setJsChecked(e.target.checked);
                            }}
                        />
                    }
                    label='JS'
                />
                <FormControl
                    fullWidth
                    style={{ marginTop: '10px', marginBottom: '10px' }}
                >
                    <FormLabel component='legend'>Art</FormLabel>
                    <Select
                        value={format}
                        onChange={(e) => {
                            setFormat(e.target.value as string);
                        }}
                    >
                        <MenuItem value='HARDCOVER'>Hardcover</MenuItem>
                        <MenuItem value='EPUB'>EPUB</MenuItem>
                        <MenuItem value='PAPERBACK'>Paperback</MenuItem>
                    </Select>
                </FormControl>
                {errors.length > 0 && (
                    <Box style={{ marginBottom: '10px', color: 'red' }}>
                        {errors.map((error, index) => (
                            <Typography key={index}>{error}</Typography>
                        ))}
                    </Box>
                )}
                <Button
                    variant='outlined'
                    onClick={handleSearch}
                    fullWidth
                    style={{ marginTop: '20px' }}
                >
                    Search
                </Button>
                <Button
                    variant='outlined'
                    onClick={handleReset}
                    fullWidth
                    style={{ marginTop: '10px' }}
                >
                    Zurücksetzen
                </Button>
            </Paper>
        </Box>
    );
};

SearchBookButton.propTypes = {
    onSearch: PropTypes.func.isRequired,
};
