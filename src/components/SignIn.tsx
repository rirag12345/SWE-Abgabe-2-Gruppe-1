import { Container, Typography, TextField, Button, Box } from '@mui/material';

const SignIn = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <form>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" fullWidth>
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
