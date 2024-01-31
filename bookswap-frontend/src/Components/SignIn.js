import { React, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { useAuth } from './AuthContext';

export default function SignIn({ myTheme }) {

  const { authUser, setAuthUser, setIsLoggedIn, setShowLogin } = useAuth();
  const [error, setError] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    try {
      await sendUserData(formData);
    } catch (error) {
      console.error(`Error in handleSubmit: ${error.message}`);
      setError(error.message);
    }
  };


  const sendUserData = async (data) => {
    try {
      const response = await fetch("http://localhost:5029/api/Auth/Login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setError("Invalid Username or Password")
        throw new Error('Authentication failed.');
      }

      const responseData = await response.json();

      if (responseData !== null) {
        setAuthUser(responseData);
        setIsLoggedIn(true);
        setShowLogin(false);
        console.log(responseData)
      }
    } catch (error) {
      console.error(`Error in sendUserData: ${error.message}`);
      setError(error.message);
      throw error;
    }
  };

  return (
    <ThemeProvider theme={myTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: (theme) => theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.secondary.light,
                },
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}