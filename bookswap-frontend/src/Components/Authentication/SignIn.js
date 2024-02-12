import { React, useState, useEffect } from 'react';
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

//*********-------main function for Login-------*********//
export default function SignIn() {

  const { authUser, setAuthUser, setIsLoggedIn} = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Useeffect signin authuser:", authUser);
  }, [authUser])

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

  //*********-------Retrieve extra details about the User-------*********//
  const getUserDetails = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5029/api/User/Details/${userId}`);

      if (response.ok) {
        const details = await response.json();
        console.log(details);

        if (details !== null) {
          const detailsObj = {
            detailsId: details.id,
            city: details.city,
            profileImage: details.profileImage,
            bookPosts: details.bookPosts
          }
          setAuthUser((prevAuthUser) => ({
            ...prevAuthUser,
            ...detailsObj
          }));
          localStorage.setItem('details', JSON.stringify(detailsObj));
        }
      } else {
        console.error('Error fetching user details:', response.statusText);
      }
    } catch (error) {
      console.warn(`User doesn't have details yet.(userDetails = null) ${error.message}`);
    }
  };

  //*********-------Retrieve main data about the User-------*********//
  const getUserData = async (data) => {
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
        const newUserObj = {
          id: responseData.id,
          username: responseData.username,
          email: responseData.email,
          phoneNumber: responseData.phoneNumber
        }
        setAuthUser(newUserObj);
        localStorage.setItem('authUser', JSON.stringify(newUserObj));
        try {
          await getUserDetails(newUserObj.id);
        } catch (error) {
          console.warn(`User doesn't have details yet.(userDetails = null) ${error.message}`);
        }
        setIsLoggedIn(true);
        navigate('/');
      }
    } catch (error) {
      console.error(`Error in sendUserData: ${error.message}`);
      setError(error.message);
      throw error;
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
                  backgroundColor: (theme) => theme.palette.secondary.light,
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