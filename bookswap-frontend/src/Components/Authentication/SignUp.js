import { React, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

//*********-------main function for Registration-------*********//
export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [alert, setAlert] = useState('');

  //*********-------Handle click on submit Sign Up-------*********//
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      email: event.target.email.value,
      username: event.target.username.value,
      password: event.target.password.value,
    };
    try {
      await createUser(formData);
    } catch (error) {
      console.error(`Error in handleSubmit: ${error.message}`);
      setError(error.message);
    }
  };

  //*********-------Add new user to our database-------*********//
  const createUser = async (data) => {
    try {
      const response = await fetch("http://localhost:5029/api/Auth/Register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setError("Invalid registration data")
        throw new Error('Registration failed.');
      }

      const responseData = await response.json();

      if (responseData !== null) {
        console.log("registered user data: ", responseData)

        setAlert('Registration Successful!');
        setError(null);

        setTimeout(() => {
          navigate('/login');
        }, 8000);

      }
    } catch (error) {
      console.error(`Error in createUser: ${error.message}`);
      setError(error.message);
      setAlert(null);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
            </Grid>
          </Grid>
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
            Sign Up
          </Button>
        </Box>
      </Box>
      <div>
        {error && <Alert severity="error">{error}</Alert>}
        {alert &&
          <>
            <Alert severity="success">{alert}</Alert>
            <Typography variant='h5' >Thank You for registration! You can Sign In now.</Typography>
          </>}
      </div>
    </Container>
  );
}