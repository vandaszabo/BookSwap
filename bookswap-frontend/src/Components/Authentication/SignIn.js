import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from './AuthContext';
import { useChat } from '../Chat/ChatContext';
import { backendUrl } from "../../Utils/ApiHelper";

//*********-------main function for Login-------*********//
export default function SignIn() {

  const { setAuthUser, setIsLoggedIn } = useAuth();
  const { openChatConnection } = useChat();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  //*********-------Handle click on submit Sign In button-------*********//
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    try {
      await getUserData(formData);
    } catch (error) {
      console.error(`Error in handleSubmit: ${error.message}`);
      setError(error.message);
    }
  };

  //*********-------Retrieve main data about the User-------*********//
  const getUserData = async (data) => {
    try {
      const response = await fetch(`${backendUrl}Auth/Login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.user && responseData.user.id) {
        setError(null);
        console.log("login user: ", responseData.user, "token: ", responseData.token);

        setAuthUser(responseData.user);
        localStorage.setItem('authUser', JSON.stringify(responseData.user));
        setIsLoggedIn(true);
        openChatConnection(responseData.user.id);
        navigate('/');
      }
      else {
        setError("Invalid email or password!");
      }
    } catch (error) {
      console.error(error);
      setError("Sorry! Unexpected error occured during login process.");
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
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
                backgroundColor: (theme) => theme.palette.secondary.main,
              },
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
    </Container>
  );
}
