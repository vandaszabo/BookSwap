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
import Edit from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useAuth } from '../Components/Authentication/AuthContext';
import UploadProfileImage from '../Components/Forms/UploadProfileImage';
import DetailsEdit from '../Components/Forms/DetailsEdit';
import { deletePost, fetchUserPosts } from '../Utils/BookFunctions';
import { fetchFavorites } from '../Utils/LikeFunctions';
import Album from '../Components/Books/Album';

//*********-------Main function for User profile-------*********//
export default function Profile({ setSelectedPost, setEditingPost }) {
    const { authUser, setAuthUser } = useAuth();
    const [userPosts, setUserPosts] = useState([]);
    const [editingPhoto, setEditingPhoto] = useState(false);
    const [editingDetails, setEditingDetails] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [favorites, setFavorites] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //*********-------Find all bookPosts from user-------*********//
    useEffect(() => {

        const fetchPosts = async () => {
            setLoading(true);
            try {
                const bookList = await fetchUserPosts(authUser.id);
                if (bookList != null) {
                    setUserPosts(bookList || []);
                    setAuthUser((prevAuthUser) => ({ ...prevAuthUser, bookPosts: bookList || [] }));
                }
            } catch (error) {
                console.error(`Error in fetchPosts: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [authUser.id, setAuthUser, deleted]);

    //*********-------Find all likes by user-------*********//
    useEffect(() => {

        const fetchLikes = async () => {
            setLoading(true);
            try {
                const bookList = await fetchFavorites(authUser.id);
                if (bookList != null) {
                    setFavorites(bookList);
                }
            } catch (error) {
                console.error(`Error in fetchPosts: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchLikes();
    }, [authUser.id]);

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

    const handleDeletePost = async (id) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this post?");
        if (!shouldDelete) {
            return; // User canceled the deletion
        }

        setLoading(true);
        try {
            const deleted = await deletePost(id);
            if (deleted != null) {
                setDeleted(true);
            }
        } catch (error) {
            console.error(`Error in handleDeletePost: ${error.message}`);
        } finally {
            setLoading(false);
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
                        <Box sx={{ mt: 2, mb: 4, py: 2, color: "#000000" }}
                            maxWidth="lg">
                            <Typography variant="h6" gutterBottom sx={{ mb: 2, borderBottom: '2px solid', borderColor: (theme) => theme.palette.secondary.light }}>
                                Your posts
                            </Typography>
                            {userPosts.length === 0 && !loading &&
                                <>
                                    <Typography variant='body2'>You don't have any post yet.</Typography>
                                    <Button variant="contained" component={Link} to={'/create'} sx={{ mt: 2 }}>Upload Now</Button>
                                </>}
                            <Grid container spacing={4}>
                                {userPosts && userPosts.map((post, index) => (
                                    <Grid item key={`${post.postId}_${index}`} xs={12} sm={6} md={4} lg={3}>
                                        <Card
                                            sx={{ height: '100%', display: 'flex', flexDirection: 'column', maxWidth: '100%' }}
                                        >
                                            {/* <Button onClick={() => handleDeletePost(post.id)} size="small">Delete</Button> */}
                                            <CardMedia
                                                onClick={() => handleViewPost(post)}
                                                component="div"
                                                sx={{
                                                    cursor: 'pointer',
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
                                                <Button onClick={() => handleEditPost(post)} size="small"><Edit /></Button>
                                                <Button onClick={() => handleDeletePost(post.postId)} size="small"><Delete /></Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                        {favorites && <Album title='Your favorites' books={favorites} onView={handleViewPost} />}
                    </Container>
                </>
            }
        </React.Fragment>
    )
};
