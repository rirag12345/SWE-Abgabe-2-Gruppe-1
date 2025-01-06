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
        if (buttonDisabled) {
            return; // prevent multiple submissions while waiting for the response
        }
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
        setShowAlert(false);
        setIsbn('');
        setRating('');
        setPreis('');
        setRabatt('');
        setTitel('');
        setButtonDisabled(false);
    }

    return (
        <Container>
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
                    flexWrap: 'wrap', // prevent overflow of children
                    alignItems: 'center', // center the children horizontally without stretching them
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
