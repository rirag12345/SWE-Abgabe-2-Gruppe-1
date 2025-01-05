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
    // const [art, setArt] = useState('');
    // const [lieferbar, setLieferbar] = useState('');
    // const [datum, setDatum] = useState('');
    // const [homepage, setHomepage] = useState('');
    // const [schlagwoerter, setSchlagwoerter] = useState('');
    // const [untertitel, setUntertitel] = useState('');
    // const [abbildungen, setAbbildungen] = useState('');
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
                    preis: parseFloat(preis),
                    rabatt: setRabatt(rabatt),
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
                {/* <TextField
                    id='art-textField'
                    label='art'
                    variant='filled'
                    value={art}
                    onChange={(e) => setArt(e.target.value)}
                />
                <TextField
                    id='lieferbar-textField'
                    label='lieferbar'
                    variant='filled'
                    value={lieferbar}
                    onChange={(e) => setLieferbar(e.target.value)}
                />
                <TextField
                    id='datum-textField'
                    label='datum'
                    variant='filled'
                    value={datum}
                    onChange={(e) => setDatum(e.target.value)}
                />
                <TextField
                    id='homepage-textField'
                    label='homepage'
                    variant='filled'
                    value={homepage}
                    onChange={(e) => setHomepage(e.target.value)}
                />
                <TextField
                    id='schlagwoerter-textField'
                    label='schlagwoerter'
                    variant='filled'
                    value={schlagwoerter}
                    onChange={(e) => setSchlagwoerter(e.target.value)}
                />
                <TextField
                    id='untertitel-textField'
                    label='untertitel'
                    variant='filled'
                    value={untertitel}
                    onChange={(e) => setUntertitel(e.target.value)}
                />
                <TextField
                    id='abbildungen-textField'
                    label='abbildungen'
                    variant='filled'
                    value={abbildungen}
                    onChange={(e) => setAbbildungen(e.target.value)}
                /> */}
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
