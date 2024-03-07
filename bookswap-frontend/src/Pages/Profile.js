import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import { Link } from 'react-router-dom';
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
import Fab from '@mui/material/Fab';

import { useAuth } from '../Components/Authentication/AuthContext';
import UploadProfileImage from '../Components/Forms/UploadProfileImage';
import DetailsEdit from '../Components/Forms/DetailsEdit';

//*********-------Main function for User profile-------*********//
export default function Profile({ setSelectedPost, setEditingPost }) {
    const { authUser, setAuthUser } = useAuth();
    const [userPosts, setUserPosts] = useState([]);
    const [editingPhoto, setEditingPhoto] = useState(false);
    const [editingDetails, setEditingDetails] = useState(false);
    const navigate = useNavigate();

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
    const handleEditData = () => {
        setEditingDetails((prevEditing) => !prevEditing);
    };

    const handleViewPost = (post) => {
        setSelectedPost(post);
        navigate('/your-post');
    };
    const handleEditPost = (post) => {
        setEditingPost(post)
        navigate('/edit-post');
    };

    const handleDeletePost = async (postId) => {
        const userConfirmed = window.confirm("Would you like to delete this post?");
    
        if (userConfirmed) {
            try {
                const response = await fetch(`http://localhost:5029/api/BookPost/Delete/${postId}`, {
                    method: 'DELETE',
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const data = await response.json();
                console.log("Deleted post:", data);
    
            } catch (error) {
                console.error(`Error in handleDeletePost: ${error.message}`);
            }
        } else {
            console.log("Post deletion cancelled by the user.");
        }
    };
    
    

    return (
        <React.Fragment>
            {authUser &&
                <>
                    <Container maxWidth="lg" sx={{ pb: 4, mt: 4, backgroundColor: (theme) => theme.palette.secondary.grey }}>
                        <Grid container spacing={2} alignItems="center">

                            {/* Picture */}
                            <Grid item xs={12} md={4}>
                                <Typography variant="h6" gutterBottom>
                                    Profile picture
                                    <Fab size="small" onClick={handleEditPicture} style={{ background: 'transparent', boxShadow: 'none' }} aria-label="edit">
                                        {!editingPhoto ? (<EditIcon color="primary" />) : (<CloseIcon color="primary" />)}
                                    </Fab>
                                </Typography>
                                <Card sx={{ width: 200, height: 200, borderRadius: '50%', overflow: 'hidden' }}>
                                    <CardMedia
                                        component="img"
                                        alt={authUser.username}
                                        sx={{ objectFit: 'cover', height: '100%', width: '100%' }}
                                        image={authUser && authUser.profileImage
                                            ? authUser.profileImage
                                            : "https://static.vecteezy.com/system/resources/previews/020/646/716/non_2x/empty-face-icon-avatar-with-black-hair-illustration-vector.jpg"}
                                    />
                                </Card>

                            </Grid>
                            {editingPhoto && <UploadProfileImage setEditingPhoto={setEditingPhoto} />}

                            {/* Personal Data */}
                            <Grid item xs={12} md={8} >
                                <Typography variant="h6" gutterBottom>
                                    Personal info
                                    <Fab size="small" onClick={handleEditData} style={{ background: 'transparent', boxShadow: 'none' }} aria-label="edit">
                                        {!editingDetails ? (<EditIcon color='primary' />) : (<CloseIcon color='primary' />)}
                                    </Fab>
                                </Typography>

                                {!editingDetails ? (
                                    <Card>
                                        <CardContent>
                                            <List>
                                                {['userName', 'email', 'phoneNumber', 'city'].map((field) => (
                                                    <ListItem key={field} sx={{ py: 1, px: 0 }}>
                                                        <ListItemText primary={authUser[field]} secondary={field.charAt(0).toUpperCase() + field.slice(1)} />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <DetailsEdit setEditingDetails={setEditingDetails} />
                                )}
                            </Grid>

                        </Grid>


                        {/* Posts */}
                        <Container sx={{ py: 4 }} maxWidth="lg">
                            <Typography variant="h6" gutterBottom>
                                Your posts
                            </Typography>
                            {userPosts.length === 0 &&
                                <>
                                    <Typography variant='body2'>You don't have any post yet.</Typography>
                                    <Button variant="contained" component={Link} to={'/create'} sx={{ mt: 2 }}>Upload Now</Button>
                                </>}
                            <Grid container spacing={4}>
                                {userPosts && userPosts.map((post, index) => (
                                    <Grid item key={`${post.id}_${index}`} xs={6} sm={4} md={3} lg={2}>
                                        <Card
                                            sx={{ height: '100%', display: 'flex', flexDirection: 'column', maxWidth: '100%' }}
                                        >
                                            {/* <Button onClick={() => handleDeletePost(post.id)} size="small">Delete</Button> */}
                                            <CardMedia
                                                component="div"
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: '200px',
                                                    width: '100%',
                                                    background: `url(${post.coverImage}) center/cover no-repeat`,
                                                }}
                                            />
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography variant="body1" component="div">
                                                    {post.title}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {post.author}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button onClick={() => handleViewPost(post)} size="small">View</Button>
                                                <Button onClick={() => handleEditPost(post)} size="small">Edit</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </Container>
                </>
            }
        </React.Fragment>
    )
};
