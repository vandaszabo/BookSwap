import React, { useEffect } from 'react';
import { useState } from 'react';
import { Typography } from "@mui/material";
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Container, Box } from '@mui/material';
import { Avatar } from '@mui/material';
import { IconButton } from '@mui/material';

export default function Poster({ posterId }) {

    const [viewPoster, setViewPoster] = useState(false);
    const [poster, setPoster] = useState({});

    const handleViewPoster = () => {
        setViewPoster((viewPoster) => !viewPoster);
    };

    const fetchPosterData = async (id) => {
        console.log("posterId: ", id);
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
                console.log(data)
                setPoster(data);
            }
        } catch (error) {
            console.error(`Error in fetchPosterData: ${error.message}`);
        }
    };

    // const fetchPosterDetails = async (id)=>{
    //     try {
    //         const response = await fetch(`http://localhost:5029/api/User/Details/${id}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }

    //         const data = await response.json();

    //         if (data !== null) {
    //             console.log(data)
    //             setPoster((prevData) => ({
    //                 ...prevData,
    //                 ...data
    //             }));
    //         }
    //     } catch (error) {
    //         console.error(`Error in fetchPosterData: ${error.message}`);
    //     }
    // };

    useEffect(() => {
        fetchPosterData(posterId);
        // fetchPosterDetails(posterId);
    }, [setPoster, posterId]);

    return (
        <Container>
             <Typography variant="body2" gutterBottom>Owner of this book:</Typography>
            <IconButton onClick={handleViewPoster} sx={{ p: 0 }}>
                <Avatar
                    alt={poster.userName}
                    src={poster && poster.profileImage
                        ? poster.profileImage
                        : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"}
                    sx={{ width: 56, height: 56 }}
                />
                <Typography variant="body2" gutterBottom>
                    {poster.userName}
                </Typography>
                {poster.city &&
                    <>
                        <PlaceIcon /> <Typography>{poster.city}</Typography>
                    </>}
            </IconButton>
            {viewPoster &&
                <Box>
                    {poster.phoneNumber && (
                        <>
                            <PhoneIcon />
                            {poster.phoneNumber}
                        </>
                    )}

                    <EmailIcon /> {poster.email}
                    {/* <LibraryBooksIcon /> {poster.bookPosts} */}
                </Box>
            }
        </Container>

    )
};
