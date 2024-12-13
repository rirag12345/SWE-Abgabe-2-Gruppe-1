import { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { z } from 'zod';
import { EmailSchema, PasswordSchema } from '../features/auth/lib/validators';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      EmailSchema.parse(email);
      setEmailError('');
    } catch (e) {
      if (e instanceof z.ZodError) {
        setEmailError(e.errors[0].message);
      }
    }

    try {
      PasswordSchema.parse(password);
      setPasswordError('');
    } catch (e) {
      if (e instanceof z.ZodError) {
        setPasswordError(e.errors[0].message);
      }
    }

    if (!emailError && !passwordError) {
      console.log('Email:', email);
      console.log('Password:', password);
    }
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
            onChange={ (e) => {setEmail(e.target.value)}}
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
            onChange={(e) => {setPassword(e.target.value)}}
            error={!!passwordError}
            helperText={passwordError}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

