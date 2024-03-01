import * as React from 'react';
import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import { Dialog, DialogContent } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import NavigateBack from '../Components/NavigateBack';
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
                <Container component="main" maxWidth="lg" sx={{ mb: 4, mt: 8 }}>
                    <NavigateBack path={backPath} />
                    <Card>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={8}>
                                    <List>
                                        <ListItem key="title" sx={{ py: 1, px: 0 }}>
                                            <ListItemText primary={localBook.title} secondary="title" />
                                        </ListItem>

                                        <ListItem key="author" sx={{ py: 1, px: 0 }}>
                                            <ListItemText primary={localBook.author} secondary="author" />
                                        </ListItem>

                                        <ListItem key="category" sx={{ py: 1, px: 0 }}>
                                            <ListItemText primary={localBook.category} secondary="category" />
                                        </ListItem>

                                        <ListItem key="pageCount" sx={{ py: 1, px: 0 }}>
                                            <ListItemText primary={localBook.pageCount} secondary="pageCount" />
                                        </ListItem>
                                        <ListItem key="description" sx={{ py: 1, px: 0 }}>
                                            <ListItemText primary={localBook.description} secondary="description" />
                                        </ListItem>
                                    </List>
                                </Grid>
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
                            </Grid>
                            <Poster posterId={localBook.userId} />
                        </CardContent>
                    </Card>
                </Container>
            }
        </React.Fragment>
    );
}
