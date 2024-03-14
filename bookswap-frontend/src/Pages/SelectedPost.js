import * as React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import { Dialog, DialogContent, Typography } from '@mui/material';
import NavigateBack from '../Utils/NavigateBack';
import Poster from '../Components/Poster';
import { useAuth } from '../Components/Authentication/AuthContext';
import { createLike, fetchPostLikers, removeLike } from '../Utils/LikeFunctions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';


//*********-------Main function for Review data for Creating new Post-------*********//
export default function SelectedPost({ book, backPath }) {
    const [openModal, setOpenModal] = useState(false);
    const [localBook, setLocalBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [likeNumber, setLikeNumber] = useState(null);
    const { authUser } = useAuth();


    //*********-------Find all Likers for book -------*********//
    useEffect(() => {

        const fetchLikerIds = async () => {
            try {
                const userIds = await fetchPostLikers(book.postId);
                if (userIds != null) {
                    setLikeNumber(userIds.length);
                    const liked = userIds.includes(authUser.id);
                    setIsLiked(liked);
                }
            } catch (error) {
                console.error(`Error in fetchPosts: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchLikerIds();
    }, [authUser.id, isLiked]);


    useEffect(() => {
        if (book.title) {
            localStorage.setItem('book', JSON.stringify(book));
            setLocalBook(book);
        }
    }, [book]);

    useEffect(() => {
        const storedBook = localStorage.getItem('book');
        if (storedBook) {
            setLocalBook(JSON.parse(storedBook));
        }
    }, []);

    const handleViewImage = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleRemoveLike = async () => {
        try {
            const result = await removeLike(authUser.id, book.postId);
            if (result) {
                setIsLiked(false);
            }
        } catch (error) {
            console.error(`Error in handleRemoveLike: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async () => {

        try {
            const result = await createLike(authUser.id, book.postId);
            if (result) {
                setIsLiked(true);
            }
        } catch (error) {
            console.error(`Error in handleLike: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <React.Fragment>
            {localBook &&
                <Container component="main" maxWidth="lg" sx={{ mb: 4, mt: 8 }}>

                    {/* Back button */}
                    <NavigateBack path={backPath} />

                    {/* Post owner */}
                    <Card sx={{ backgroundColor: (theme) => theme.palette.secondary.beige, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Poster posterId={localBook.userId} />
                        {!loading &&
                            <Container sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Box sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center', color: (theme) => theme.palette.primary.main }}>
                                {book.userId !== authUser.id && !isLiked &&
                                    <Button
                                        size="small"
                                        onClick={handleLike}
                                        variant='contained'>Like
                                    </Button>
                                }
                                {isLiked &&
                                    <Button
                                        size="small"
                                        onClick={handleRemoveLike}
                                        variant='contained'>
                                        Remove Like
                                    </Button>
                                }
                                </Box>
                                <Box sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center', color: (theme) => theme.palette.primary.main }}>
                                    {likeNumber}
                                    <FavoriteIcon />
                                </Box>
                            </Container>
                        }
                    </Card>

                    <Card sx={{ backgroundColor: (theme) => theme.palette.secondary.grey }}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <Button onClick={handleViewImage}>
                                        <img
                                            src={localBook.coverImage}
                                            alt="cover"
                                            style={{
                                                maxWidth: '50%',
                                                height: 'auto',
                                            }}
                                        />
                                    </Button>
                                    <Dialog open={openModal} onClose={handleCloseModal}>
                                        <DialogContent>
                                            <img
                                                src={localBook.coverImage}
                                                alt="full-size-cover"
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                }}
                                            />
                                        </DialogContent>
                                    </Dialog>
                                </Grid>
                                <Grid item xs={12} md={8}>

                                    <Typography sx={{ fontSize: '25px', mt: 1 }} >
                                        {localBook.title}
                                    </Typography>

                                    <Typography sx={{ fontSize: '20px', mt: 1 }} >
                                        {localBook.author}
                                    </Typography>

                                    <Typography sx={{ fontSize: '15px', mt: 1 }} >
                                        Category/Genre: {localBook.category}
                                    </Typography>

                                    <Typography sx={{ fontSize: '15px', mt: 1 }} >
                                        Language: {localBook.language}
                                    </Typography>

                                    <Typography sx={{ fontSize: '15px' }} >
                                        Number of pages: {localBook.pageCount}
                                    </Typography>
                                    <Typography sx={{ fontSize: '15px', mt: 2, }} >
                                        {localBook.description}
                                    </Typography>

                                </Grid>
                            </Grid>
                        </CardContent>

                    </Card>
                </Container>
            }
        </React.Fragment>
    );
}
