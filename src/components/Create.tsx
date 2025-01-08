// Copyright (C) 2024 - present Felix Jaeger
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import SendIcon from '@mui/icons-material/Send';
import {
    Alert,
    Box,
    Button,
    Container,
    TextField,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { CreateSchema } from '../features/auth/lib/validators';

/**
 * Create component for creating a new book
 * @returns JSX.Element for rendering the component
 * @author Felix Jaeger
 */
export function Create() {
    // states for text fields
    const [isbn, setIsbn] = useState('');
    const [rating, setRating] = useState('');
    const [preis, setPreis] = useState('');
    const [rabatt, setRabatt] = useState('');
    const [titel, setTitel] = useState('');

    // states for validation
    const [isbnError, setIsbnError] = useState('');
    const [ratingError, setRatingError] = useState('');
    const [preisError, setPreisError] = useState('');
    const [rabattError, setRabattError] = useState('');
    const [titelError, setTitelError] = useState('');

    // state for alert
    const [showAlert, setShowAlert] = useState(false);

    const validateFields = () => {
        const result = CreateSchema.safeParse({
            isbn,
            rating,
            preis,
            rabatt,
            titel,
        });

        if (!result.success) {
            result.error.errors.forEach((error) => {
                switch (error.path[0]) {
                    case 'isbn':
                        setIsbnError(error.message);
                        break;
                    case 'rating':
                        setRatingError(error.message);
                        break;
                    case 'preis':
                        setPreisError(error.message);
                        break;
                    case 'rabatt':
                        setRabattError(error.message);
                        break;
                    case 'titel':
                        setTitelError(error.message);
                        break;
                    default:
                        break;
                }
            });
            return false;
        }

        setIsbnError('');
        setRatingError('');
        setPreisError('');
        setRabattError('');
        setTitelError('');
        return true;
    };

    async function handleSubmit() {
        // prevent submission if there are validation errors
        if (!validateFields()) {
            return;
        }

        try {
            // send data to server
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

        // reset form
        setIsbn('');
        setRating('');
        setPreis('');
        setRabatt('');
        setTitel('');
    }

    return (
        <Container component='section' maxWidth='xs'>
            <Typography
                component='h1'
                id='create-book-form'
                align='center'
                variant='h4'
                gutterBottom
            >
                Create a new book
            </Typography>
            <Box
                component='form' // render as form element
                autoComplete='off'
                onSubmit={(event) => {
                    event.preventDefault(); // preventing default behavior of reloading the whole page after a form submission
                    handleSubmit();
                }}
                sx={{
                    m: 'auto',
                    display: 'flex', // render as flex container
                    flexDirection: 'column', // stack the children vertically
                    alignItems: 'center', // center the children horizontally without stretching them
                    gap: '0.5em',
                }}
                aria-labelledby='create-book-form' // associates the form with the heading
            >
                <TextField
                    fullWidth
                    required
                    id='isbn-textField'
                    label='isbn'
                    variant='filled'
                    value={isbn}
                    onChange={(e) => {
                        setIsbn(e.target.value);
                        setIsbnError('');
                    }}
                    error={!!isbnError}
                    helperText={isbnError}
                />
                <TextField
                    fullWidth
                    required
                    id='rating-textField'
                    label='rating'
                    variant='filled'
                    value={rating}
                    onChange={(e) => {
                        setRating(e.target.value);
                        setRatingError('');
                    }}
                    error={!!ratingError}
                    helperText={ratingError}
                />
                <TextField
                    fullWidth
                    required
                    id='preis-textField'
                    label='preis'
                    variant='filled'
                    value={preis}
                    onChange={(e) => {
                        setPreis(e.target.value);
                        setPreisError('');
                    }}
                    error={!!preisError}
                    helperText={preisError}
                />
                <TextField
                    fullWidth
                    required
                    id='rabatt-textField'
                    label='rabatt'
                    variant='filled'
                    value={rabatt}
                    onChange={(e) => {
                        setRabatt(e.target.value);
                        setRabattError('');
                    }}
                    error={!!rabattError}
                    helperText={rabattError}
                />
                <TextField
                    fullWidth
                    required
                    id='titel-textField'
                    label='titel'
                    variant='filled'
                    value={titel}
                    onChange={(e) => {
                        setTitel(e.target.value);
                        setTitelError('');
                    }}
                    error={!!titelError}
                    helperText={titelError}
                />
                <Button
                    type='submit'
                    variant='contained'
                    endIcon={<SendIcon />}
                    disabled={
                        !!isbnError ||
                        !!ratingError ||
                        !!preisError ||
                        !!rabattError ||
                        !!titelError
                    }
                    aria-label='submit' // accessible label for screen readers
                >
                    OK
                </Button>
                {showAlert && (
                    <Alert
                        severity='success'
                        onClose={() => setShowAlert(false)}
                        role='alert' // accessible role for screen readers
                    >
                        Created!
                    </Alert>
                )}
            </Box>
        </Container>
    );
}
