import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import { Button } from '@mui/material';
import { Container } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import { useAuth } from './Authentication/AuthContext';
import UploadProfileImage from './Forms/UploadProfileImage';

//*********-------Main function for User profile-------*********//
export default function Profile() {
    const { authUser, setAuthUser } = useAuth();
    const [userPosts, setUserPosts] = useState([]);
    const [editingPhoto, setEditingPhoto] = useState(false);

    //*********-------Find all bookPosts from user-------*********//
    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await fetch(`http://localhost:5029/api/BookPost/User/${authUser.id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                setUserPosts(data || []);
                setAuthUser((prevAuthUser) => ({ ...prevAuthUser, bookPosts: data || [] }));
            } catch (error) {
                console.error(`Error in fetchUserPosts: ${error.message}`);
            }
        };

        fetchUserPosts();
    }, [authUser.id, setAuthUser]);

    const handleEditPicture = () => {
        setEditingPhoto((prevEditing) => !prevEditing);
    };

    return (
        <React.Fragment>
            {authUser &&
                <>
                    <Container maxWidth="lg" sx={{ mt: 4 }}>
                        <Grid container spacing={2} sx={{ maxWidth: '50%' }}>
                            <Grid item xs={12} sm={8} md={6} lg={6}>
                                <Typography variant="h6" gutterBottom>
                                    Profile Image
                                </Typography>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        alt={authUser.username}
                                        //height="300"
                                        image={authUser && authUser.profileImage
                                            ? authUser.profileImage
                                            : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"}
                                    />
                                    <div style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%',
                                    }}>
                                        <Button
                                            onClick={handleEditPicture}
                                            style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                right: 0,
                                                borderRadius: '50%',
                                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                            }}
                                        >
                                            {!editingPhoto ? (<EditIcon />) : (<CloseIcon />)}
                                        </Button>
                                    </div>
                                </Card>
                            </Grid>

                            {editingPhoto && <UploadProfileImage />}

                            <Grid item xs={12} md={8}>
                                <Typography variant="h6" gutterBottom>
                                    Personal info
                                </Typography>
                                <Card>
                                    <CardContent>
                                        <List>
                                            {['username', 'email', 'phoneNumber', 'city'].map((field) => (
                                                <ListItem key={field} sx={{ py: 1, px: 0 }}>
                                                    <ListItemText primary={authUser[field]} secondary={field.charAt(0).toUpperCase() + field.slice(1)} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>

                        </Grid>
                    </Container>
                    <Container sx={{ py: 4 }} maxWidth="lg">
                        <Typography variant="h6" gutterBottom>
                            Your posts
                        </Typography>
                        <Grid container spacing={4}>
                            {userPosts && userPosts.map((post, index) => (
                                <Grid item key={`${post.id}_${index}`} xs={6} sm={4} md={3} lg={2}>
                                    <Card
                                        sx={{ height: '100%', display: 'flex', flexDirection: 'column', maxWidth: '100%' }}
                                    >
                                        <CardMedia
                                            component="div"
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '200px',
                                                width: '100%',
                                            }}
                                            image={post.coverImage}
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography variant="body1" component="div">
                                                {post.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {post.author}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">View</Button>
                                            <Button size="small">Edit</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </>
            }
        </React.Fragment>
    )
};
