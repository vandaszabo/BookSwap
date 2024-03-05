import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';

import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Filters from '../Components/Filters';

import { useAuth } from '../Components/Authentication/AuthContext';

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

export default function AllBooks({ books, setSelectedPost }) {

    const [filterObj, setFilterObj] = useState({});
    const [favorites, setFavorites] = useState([]);
    const { authUser } = useAuth();
    const navigate = useNavigate();

    const handleLike = (bookId) => {
        console.log("add to favorites: ", bookId);
        setFavorites(prev => [...prev, bookId]);
    };

    const handleView = (book) => {
        setSelectedPost(book);
        navigate('/post');
    };


    return (
        <React.Fragment>
            <Container
                component="main"
                maxWidth="lg"
                sx={{ mb: 4 }}>
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: '40vh',
                            color: (theme) => theme.palette.primary.light,
                            backgroundColor: (theme) => theme.palette.primary.main,
                            alignItems: 'center',
                        }}
                    >
                        <Container>
                            <Typography
                                component="h5"
                                variant="body1"
                                align="center"
                                gutterBottom
                            >
                                Find your new favourite book!
                            </Typography>
                            <Typography
                                variant="body2"
                                align="center"
                                paragraph>
                                Like the post that interests you and get likes from others. If there is a match, you can decide to exchange the books.
                            </Typography>
                        </Container>
                        <Container>
                            <img
                                src="https://cdn.dribbble.com/users/486498/screenshots/11951875/media/ba889cb7336c75a8cfa54656dc912bd9.jpg?compress=1&resize=700x525&vertical=center"
                                alt="reading-woman"
                                style={{
                                    maxWidth: 'auto',
                                    maxHeight: 'auto',
                                    height: '40vh',
                                    width: 'auto',
                                    display: 'block', // Remove any default spacing issues
                                }}
                            />
                        </Container>
                    </Box>
                    <Filters
                        setFilterObj={setFilterObj}
                    />
                    <Container
                        sx={{ py: 8, color: (theme) => theme.palette.primary.main }}
                        maxWidth="md">
                        <Grid
                            container spacing={4}>
                            {books && books.map((book, index) => (
                                <Grid
                                    item key={`${book.postId}_${index}`}
                                    xs={6}
                                    sm={4}
                                    md={3}
                                    lg={3}>
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
                                                background: `url(${book.coverImage}) center/cover no-repeat`,
                                            }}
                                        />
                                        <CardContent
                                            sx={{ flexGrow: 1 }}>
                                            <Typography
                                                variant="body1"
                                                component="div">
                                                {book.title}
                                            </Typography>
                                            <Typography
                                                variant="body2">
                                                {book.author}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                onClick={() => handleView(book)}
                                                size="small">
                                                View
                                            </Button>
                                            <Button
                                                onClick={() => handleLike(book.postId)}
                                                size="small">
                                                Like
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
                <Box
                    sx={{ p: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    component="footer">
                    <Button
                        onClick={topFunction}>
                        Back to top
                    </Button>
                </Box>
            </Container>
        </React.Fragment>
    );
}