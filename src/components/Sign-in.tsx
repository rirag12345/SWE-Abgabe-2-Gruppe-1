import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { SignInSchema } from '../features/auth/lib/validators';

const tokenUrl: string = import.meta.env.VITE_TOKEN_URL as string;

/**
 * SignIn Komponente welche das Anmelden mit Email und Passwort erlaubt
 * Validiert Email und Passwort mit den zugehörigen Zod Schemas und gibt die Fehlermeldungen aus.
 * Nach erfolgreichen Login werden access und refresh token im Localstorage gespeichert und es wird auf die Home Seite navigiert.
 *
 * @component
 *
 * @returns Die gerenderte Komponente.
 */
export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate: NavigateFunction = useNavigate();

    const validateFields = () => {
        const result = SignInSchema.safeParse({
            email,
            password,
        });

        if (!result.success) {
            result.error.errors.forEach((error) => {
                switch (error.path[0]) {
                    case 'email':
                        setEmailError(error.message);
                        break;
                    case 'password':
                        setPasswordError(error.message);
                        break;
                    default:
                        break;
                }
            });
            return false;
        }

        setEmailError('');
        setPasswordError('');
        return true;
    };

    const handleSubmit = () => {
        // if (!validateFields()) {
        //     return;
        // }
        //FIXME Das ist eigentlich unnötig, der submit button ist aus wenn es Fehler bei der Validierung gibt --> Siehe Zeile 127 (alternativ validate Fields in Zeile 127 eintragen und if clause entfernen)

        axios
            .post(tokenUrl, {
                username: email,
                password: password,
            })
            .then((result) => {
                localStorage.setItem('JWT', result.data.access_token);
                localStorage.setItem('refreshToken', result.data.refresh_token);

                navigate('/');
            })
            .catch((error: AxiosError) => {
                if (error.status === 401) {
                    error.message =
                        'The username or password you provided is incorrect';
                }
                setPasswordError(error.message);
                setEmailError(error.message);
            });
    };

    return (
        <Container maxWidth='sm'>
            <Box
                mt={5}
                component='form'
                onSubmit={(event) => {
                    event.preventDefault(); // preventing default behavior of reloading the whole page after a form submission
                    handleSubmit();
                }}
                autoComplete='off'
            >
                <Typography variant='h4' gutterBottom>
                    Sign In
                </Typography>
                <TextField
                    required
                    label='Email'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError('');
                    }}
                    error={!!emailError}
                    helperText={emailError}
                />
                <TextField
                    required
                    label='Password'
                    type='password'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError('');
                    }}
                    error={!!passwordError}
                    helperText={passwordError}
                />
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                    disabled={!!emailError || !!passwordError}
                >
                    Sign In
                </Button>
            </Box>
        </Container>
    );
};
