import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { backendUrl } from "../../Utils/ApiHelper";

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
    await createUser(formData);
  };

  //*********-------Add new user to our database-------*********//
  const createUser = async (data) => {
    try {
      const response = await fetch(`${backendUrl}Auth/Register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log("Respons:", responseData);

      if (responseData.id) {
        setError(null);
        console.log("registered user data: ", responseData)

        setAlert('Registration Successful!');

        setTimeout(() => {
          navigate('/login');
        }, 8000);

      } else {
        console.error('Invalid response:', responseData);
        setError(responseData);
        setAlert(null);
      }
    } catch (error) {
      console.error(error);
      setError("Sorry! Unexpected error occured during registration process.");
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
                backgroundColor: (theme) => theme.palette.secondary.main,
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
      <div>
        {error?.PasswordTooShort ? (
          <Alert severity="error">
            {error.PasswordTooShort[0]}
          </Alert>
        ) : error?.DuplicateEmail ? (
          <Alert severity="error">
            {error.DuplicateEmail[0]}
          </Alert>
        ) : (
          error && <Alert severity="error">
            {error}
          </Alert>
        )}
      </div>

      {alert &&
        <>
          <Alert severity="success">{alert}</Alert>
          <Typography variant='h5' >Thank You for registration! You can Sign In now.</Typography>
        </>}
    </Container>
  );
}
