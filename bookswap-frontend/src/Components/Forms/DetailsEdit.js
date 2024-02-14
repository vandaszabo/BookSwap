import { React, useState } from 'react';
import { useAuth } from '../Authentication/AuthContext';

import { Container } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { Alert } from '@mui/material';

export default function DetailsEdit({ setEditingDetails }) {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const cityEditRequest = {
            userId: authUser.id,
            city: event.target.city.value,
            profileImage: authUser.profileImage
        };
        const dataEditRequest = {
            userId: authUser.id,
            newEmail: event.target.email.value,
            newUsername: event.target.username.value,
            newPhoneNumber: event.target.phoneNumber.value
        };

        try {
            saveUserDetails(cityEditRequest);
            saveUserData(dataEditRequest);
        } catch (error) {
            console.error(`Error in handleSubmit: ${error.message}`);
            setError(error.message);
        }
    };

    const saveUserData = (data) => {
        setLoading(true);
        console.log(data);

        fetch("http://localhost:5029/api/User/UpdateData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                setAuthUser((prevAuthUser) => ({
                    ...prevAuthUser, responseData
                }));
                localStorage.setItem('authUser', JSON.stringify(responseData));
            })
            .catch((error) => {
                console.error('Error saving userData:', error);
            })
            .finally(() => {
                setLoading(false);
                setEditingDetails(false);
            });
    };

    const saveUserDetails = (data) => {
        setLoading(true);
        console.log(data);

        fetch("http://localhost:5029/api/User/UpdateDetails", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                setAuthUser((prevAuthUser) => ({
                    ...prevAuthUser, responseData
                }));
                localStorage.setItem('details', JSON.stringify(responseData));
            })
            .catch((error) => {
                console.error('Error saving userDetails:', error);
            })
            .finally(() => {
                setLoading(false);
                setEditingDetails(false);
            });
    };

    return (
        <Container component="main" maxWidth="md">
            <Card component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <CardContent>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="New Username"
                        name="username"
                        defaultValue={authUser.username}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="New Email"
                        name="email"
                        defaultValue={authUser.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phoneNumber"
                        label="New Phone Number"
                        name="phoneNumber"
                        defaultValue={authUser.phoneNumber}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="city"
                        label="New City"
                        id="city"
                        defaultValue={authUser.city}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        sx={{
                            mt: 3,
                            mb: 2,
                            backgroundColor: (theme) => theme.palette.primary.main,
                            '&:hover': {
                                backgroundColor: (theme) => theme.palette.secondary.light,
                            },
                        }}
                    >
                        Save
                    </Button>
                </CardContent>
            </Card>
            {error && <Alert severity="error">{error}</Alert>}
        </Container>
    )
}