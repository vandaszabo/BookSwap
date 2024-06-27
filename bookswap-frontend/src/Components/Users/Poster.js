import React, { useEffect, useCallback, useState } from 'react';
import { Typography } from "@mui/material";
import PlaceIcon from '@mui/icons-material/Place';
import { Container } from '@mui/material';
import { Avatar } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { backendUrl } from '../../Utils/ApiHelper';

export default function Poster({ posterId }) {

    const [poster, setPoster] = useState({});
    const [loading, setLoading] = useState(true);

    // Get Poster information by userId
    const fetchPosterData = useCallback(async (id) => {
        try {

            const response = await fetch(`${backendUrl}User/${posterId}`, {
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
        } finally {
            setLoading(false);
        }

    }, [posterId]);

    useEffect(() => {
        fetchPosterData(posterId);
    }, [posterId, fetchPosterData]);

    return (
        <Container sx={{ display: 'flex', alignItems: 'center' }}>
            {!loading ?
                <>
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
                </> : <CircularProgress sx={{ color: '#006D5B', marginRight: 1 }} />
            }
        </Container>

    )
};
