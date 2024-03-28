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

    // Change User information
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("authuser: ", authUser);

        // New data
        const dataEditRequest = {
            userId: authUser.id,
            newEmail: event.target.email.value,
            newUsername: event.target.userName.value,
            newPhoneNumber: event.target.phoneNumber.value,
            newCity: event.target.city.value,
        };

        try {
            // Perform only if new data is different than original
            if (dataEditRequest.newEmail !== authUser.email ||
                dataEditRequest.newPhoneNumber !== authUser.phoneNumber ||
                dataEditRequest.newUsername !== authUser.userName ||
                dataEditRequest.newCity !== authUser.city) {
                saveUserData(dataEditRequest);
            }
        } catch (error) {
            console.error(`Error in handleSubmit: ${error.message}`);
            setError(error.message);
        }
    };

    // Update data in Db and AuthContext
    const saveUserData = (data) => {
        setLoading(true);

        fetch("http://localhost:5029/api/User/UpdateData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseData) => {
                setAuthUser(responseData);
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

    return (
        <Container component="main" maxWidth="md">
            <Card component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <CardContent>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="userName"
                        label="New Username"
                        name="userName"
                        defaultValue={authUser.userName}
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
                                backgroundColor: (theme) => theme.palette.secondary.main,
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