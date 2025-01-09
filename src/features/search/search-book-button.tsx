import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select,
    TextField,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import PropTypes from 'prop-types';
import { useState } from 'react';
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
    const [pyChecked, setPyChecked] = useState(false);
    const [jaChecked, setJaChecked] = useState(false);
    const [art, setArt] = useState('');
    const [lieferbar, setLieferbar] = useState(true);

    const handleSearch = () => {
        const criteria = {
            isbn,
            title,
            rating: rating ? rating.toString() : '',
            tsChecked,
            jsChecked,
            pyChecked,
            jaChecked,
            art,
            lieferbar,
        };

        onSearch(criteria);
    };

    const handleReset = () => {
        setIsbn('');
        setTitle('');
        setRating(null);
        setTsChecked(false);
        setJsChecked(false);
        setPyChecked(false);
        setJaChecked(false);
        setArt('');
        setLieferbar(true);
    };

    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            style={{ width: '100%' }}
        >
            <Paper
                elevation={3}
                style={{
                    padding: '0.3em',
                    textAlign: 'center',
                    width: '500px',
                }}
            >
                <TextField
                    label='ISBN'
                    variant='outlined'
                    fullWidth
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    style={{ marginBottom: '0.2em' }}
                />
                <TextField
                    label='Titel'
                    variant='outlined'
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ marginBottom: '0.2em' }}
                />
                <Box>
                    <FormLabel component='legend'>Rating</FormLabel>
                    <Rating
                        name='search-rating'
                        value={rating}
                        precision={1}
                        onChange={(_event, newValue) => setRating(newValue)}
                    />
                </Box>
                <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    style={{ width: '100%' }}
                >
                    <FormLabel component='legend'>Schlagwoerter</FormLabel>
                    <RadioGroup
                        row
                        name='RadioGroup-schlagwoerter'
                        style={{ justifyContent: 'center', display: 'flex' }}
                    >
                        <FormControlLabel
                            value='Typescript'
                            control={
                                <Radio
                                    id='Radio-Typescript'
                                    checked={tsChecked}
                                    onChange={(e) =>
                                        setTsChecked(e.target.checked)
                                    }
                                />
                            }
                            label='TypeScript'
                        />
                        <FormControlLabel
                            value='JavaScript'
                            control={
                                <Radio
                                    id='Radio-JavaScript'
                                    checked={jsChecked}
                                    onChange={(e) =>
                                        setJsChecked(e.target.checked)
                                    }
                                />
                            }
                            label='JavaScript'
                        />
                        <FormControlLabel
                            value='Python'
                            control={
                                <Radio
                                    id='Radio-Python'
                                    checked={pyChecked}
                                    onChange={(e) =>
                                        setPyChecked(e.target.checked)
                                    }
                                />
                            }
                            label='Python'
                        />
                        <FormControlLabel
                            value='Java'
                            control={
                                <Radio
                                    id='Radio-Java'
                                    checked={jaChecked}
                                    onChange={(e) =>
                                        setJaChecked(e.target.checked)
                                    }
                                />
                            }
                            label='Java'
                        />
                    </RadioGroup>
                </Box>

                <FormControl fullWidth>
                    <FormLabel component='legend'>Art</FormLabel>
                    <Select
                        value={art}
                        onChange={(e) => setArt(e.target.value as string)}
                    >
                        <MenuItem value='HARDCOVER'>Hardcover</MenuItem>
                        <MenuItem value='EPUB'>EPUB</MenuItem>
                        <MenuItem value='PAPERBACK'>Paperback</MenuItem>
                    </Select>
                </FormControl>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={lieferbar}
                            onChange={(e) => setLieferbar(e.target.checked)}
                        />
                    }
                    label='Lieferbar'
                />
                <Button variant='outlined' onClick={handleSearch} fullWidth>
                    Search
                </Button>
                <Button
                    variant='outlined'
                    onClick={handleReset}
                    fullWidth
                    style={{ marginTop: '0.2em' }}
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
