import React from 'react';
import { useAuth } from './Authentication/AuthContext';
import { useState } from 'react';
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CardActions from '@mui/material/CardActions';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Container } from '@mui/material';

//*********-------Main function for User profile-------*********//
export default function Profile({ myTheme }) {
    const { authUser, setAuthUser } = useAuth();
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        console.log("Useeffect profile authuser:", authUser);
    }, [authUser])

    //*********-------Find all bookPosts from user-------*********//
    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await fetch(`http://localhost:5029/api/BookPost/User/${authUser.id}`, {
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
                    setUserPosts(data);
                    const updatedAuthUser = { ...authUser, bookPosts: data };
                    setAuthUser(updatedAuthUser);
                }
            } catch (error) {
                console.error(`Error in fetchUserPosts: ${error.message}`);
            }
        };

        fetchUserPosts();
    }, [setUserPosts]);

    return (
        <React.Fragment>
            {authUser &&
                <>
                    <Container>
                        <Typography variant="h6" gutterBottom>
                            Personal info
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>
                                <Card>
                                    <CardContent>
                                        <List>
                                            <ListItem key="username" sx={{ py: 1, px: 0 }}>
                                                <ListItemText primary={authUser.username} secondary="Username" />
                                            </ListItem>

                                            <ListItem key="email" sx={{ py: 1, px: 0 }}>
                                                <ListItemText primary={authUser.email} secondary="Email" />
                                            </ListItem>

                                            <ListItem key="phoneNumber" sx={{ py: 1, px: 0 }}>
                                                <ListItemText primary={authUser.phoneNumber} secondary="Phone number" />
                                            </ListItem>

                                            <ListItem key="city" sx={{ py: 1, px: 0 }}>
                                                <ListItemText primary={authUser.city} secondary="City" />
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        alt={authUser.username}
                                        //height="300"
                                        image={authUser && authUser.profileImage
                                            ? authUser.profileImage
                                            : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"}
                                    />
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Typography variant="h6" gutterBottom>
                            Books
                        </Typography>
                        <Grid container spacing={4}>
                            {userPosts && userPosts.map((post, index) => (
                                <Grid item key={`${post.id}_${index}`} xs={12} sm={6} md={4}>
                                    <Card
                                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                    >
                                        <CardMedia
                                            component="div"
                                            sx={{
                                                // 16:9
                                                pt: '56.25%',
                                                // width: '100%',
                                                // height: '300px'
                                            }}
                                            image={post.coverImage}
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {post.title}
                                            </Typography>
                                            <Typography>
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
