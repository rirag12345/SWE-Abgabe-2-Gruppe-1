import SendIcon from '@mui/icons-material/Send';
import { Alert, Box, Button, Container, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

export function Create() {
    const [isbn, setIsbn] = useState('');
    const [rating, setRating] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [title, setTitle] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    async function handleClick() {
        setButtonDisabled(true);
        try {
            const response = await axios.post(
                'https://localhost:3000/rest',
                {
                    isbn: isbn,
                    rating: parseInt(rating),
                    preis: parseFloat(price),
                    rabatt: parseFloat(discount),
                    titel: { titel: title },
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
        setPrice('');
        setDiscount('');
        setTitle('');
        setButtonDisabled(false);
        setShowAlert(false);
    }

    return (
        <Container>
            <Box sx={{ display: 'block' }}>
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
                    id='price-textField'
                    label='preis'
                    variant='filled'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                    required
                    id='discount-textField'
                    label='rabatt'
                    variant='filled'
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                />
                <TextField
                    required
                    id='title-textField'
                    label='titel'
                    variant='filled'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Button
                    onClick={handleClick}
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
