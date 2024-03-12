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


//*********-------Main function for Review data for Creating new Post-------*********//
export default function SelectedPost({ book, backPath }) {
    const [openModal, setOpenModal] = useState(false);
    const [localBook, setLocalBook] = useState(null);

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

    return (
        <React.Fragment>
            {localBook &&
                <Container component="main" maxWidth="lg" sx={{ mb: 4, mt: 8}}>

                    {/* Back button */}
                    <NavigateBack path={backPath} />

                    {/* Post owner */}
                    <Card sx={{backgroundColor: (theme) => theme.palette.secondary.beige, display: 'flex', justifyContent: 'flex-end'}}>
                        <Poster posterId={localBook.userId} />
                    </Card>
                    
                    <Card sx={{backgroundColor: (theme) => theme.palette.secondary.grey}}>
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
                                   
                                        <Typography sx={{fontSize: '25px', mt: 1}} >
                                            {localBook.title}
                                        </Typography>

                                        <Typography sx={{fontSize: '20px', mt: 1}} >
                                            {localBook.author}
                                        </Typography>

                                        <Typography sx={{fontSize: '15px', mt: 1 }} >
                                           Category/Genre: {localBook.category}
                                        </Typography>

                                        <Typography sx={{fontSize: '15px', mt: 1 }} >
                                           Language: {localBook.language}
                                        </Typography>

                                        <Typography sx={{fontSize: '15px'}} >
                                           Number of pages: {localBook.pageCount}
                                        </Typography>
                                        <Typography sx={{fontSize: '15px', mt: 2,}} >
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
