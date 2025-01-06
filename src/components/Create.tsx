import SendIcon from '@mui/icons-material/Send';
import { Alert, Box, Button, Container, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

export function Create() {
    const [isbn, setIsbn] = useState('');
    const [rating, setRating] = useState('');
    const [preis, setPreis] = useState('');
    const [rabatt, setRabatt] = useState('');
    const [titel, setTitel] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    async function handleSubmit() {
        setButtonDisabled(true);
        try {
            const response = await axios.post(
                'https://localhost:3000/rest',
                {
                    isbn: isbn,
                    rating: parseInt(rating),
                    preis: parseFloat(preis),
                    rabatt: parseFloat(rabatt),
                    titel: { titel: titel },
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('JWT')}`,
                    },
                },
            );
            if (response.status === 201) {
                setShowAlert(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function reset() {
        setIsbn('');
        setRating('');
        setPreis('');
        setRabatt('');
        setTitel('');
        setButtonDisabled(false);
        setShowAlert(false);
    }

    return (
        <Container>
            <Box
                component='form'
                autoComplete='off'
                onSubmit={(event) => {
                    event.preventDefault(); // preventing default behavior of reloading the whole page after a form submission
                    handleSubmit();
                }}
                sx={{
                    m: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '0.5em',
                }}
            >
                <TextField
                    required
                    id='isbn-textField'
                    label='isbn'
                    variant='filled'
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                />
                <TextField
                    required
                    id='rating-textField'
                    label='rating'
                    variant='filled'
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
                <TextField
                    required
                    id='preis-textField'
                    label='preis'
                    variant='filled'
                    value={preis}
                    onChange={(e) => setPreis(e.target.value)}
                />
                <TextField
                    required
                    id='rabatt-textField'
                    label='rabatt'
                    variant='filled'
                    value={rabatt}
                    onChange={(e) => setRabatt(e.target.value)}
                />
                <TextField
                    required
                    id='titel-textField'
                    label='titel'
                    variant='filled'
                    value={titel}
                    onChange={(e) => setTitel(e.target.value)}
                />
                <Button
                    type='submit'
                    variant='contained'
                    endIcon={<SendIcon />}
                    disabled={buttonDisabled}
                >
                    OK
                </Button>
                {showAlert && (
                    <Alert severity='success' onClose={() => reset()}>
                        Success!
                    </Alert>
                )}
            </Box>
        </Container>
    );
}
