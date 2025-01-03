import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { EmailSchema, PasswordSchema } from '../features/auth/lib/validators';

const tokenUrl: string = import.meta.env.VITE_TOKEN_URL as string;

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    try {
      EmailSchema.parse(email);
      setEmailError('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.errors[0].message);
      }
    }
  }, [email]);

  useEffect(() => {
    try {
      PasswordSchema.parse(password);
      setPasswordError('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setPasswordError(error.errors[0].message);
      }
    }
  }, [password]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post(tokenUrl, {
        username: email,
        password: password,
      })
      .then((result) => {
        localStorage.setItem('JWT', result.data.access_token);
        localStorage.setItem('refreshToken', result.data.refresh_token);

        // TODO check if needed
        setEmail('');
        setPassword('');

        navigate('/');
      })
      .catch((error: AxiosError) => {
        if (error.status === 401) {
          error.message = 'The username or password you provided is incorrect';
        }
        setPasswordError(error.message);
        setEmailError(error.message);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            error={!!passwordError}
            helperText={passwordError}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!!emailError || !!passwordError}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};
