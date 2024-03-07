import React, { useEffect } from 'react';
import { useState } from 'react';
import { Typography } from "@mui/material";
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Container, Box } from '@mui/material';
import { Avatar } from '@mui/material';

export default function Poster({ posterId }) {

    const [poster, setPoster] = useState({});

    const fetchPosterData = async (id) => {
        try {
            const response = await fetch(`http://localhost:5029/api/User/${posterId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data !== null) {
                setPoster(data);
            }
        } catch (error) {
            console.error(`Error in fetchPosterData: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchPosterData(posterId);
    }, [posterId]);

    return (
        <Container sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                    alt={poster.userName}
                    src={poster && poster.profileImage
                        ? poster.profileImage
                        : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"}
                    sx={{ width: 56, height: 56 }}
                />
                <Typography variant="body2">
                    {poster.userName}
                </Typography>
                {poster.city &&
                    <>
                        <PlaceIcon /> <Typography variant="body2">{poster.city}</Typography>
                    </>}
        </Container>

    )
};
