import * as React from 'react';
import {useState} from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Dialog, DialogContent } from '@mui/material';

//*********-------Main function for Review data for Creating new Post-------*********//
export default function SelectedPost({ book }) {

    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    const handleViewImage = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <React.Fragment>
            {book &&
                <Container component="main" maxWidth="lg" sx={{ mb: 4, mt: 8 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                        <Button
                            variant='outlined'
                            sx={{ mb: 4 }}
                            size="small"
                            onClick={() => navigate('/books')}>
                            <ArrowBackIcon />
                        </Button>
                    </Box>
                    <Typography variant="h6" gutterBottom>
                        {book.title}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <List>
                                <ListItem key="title" sx={{ py: 1, px: 0 }}>
                                    <ListItemText primary={book.title} secondary="title" />
                                </ListItem>

                                <ListItem key="author" sx={{ py: 1, px: 0 }}>
                                    <ListItemText primary={book.author} secondary="author" />
                                </ListItem>

                                <ListItem key="category" sx={{ py: 1, px: 0 }}>
                                    <ListItemText primary={book.category} secondary="category" />
                                </ListItem>

                                <ListItem key="pageCount" sx={{ py: 1, px: 0 }}>
                                    <ListItemText primary={book.pageCount} secondary="pageCount" />
                                </ListItem>
                                <ListItem key="description" sx={{ py: 1, px: 0 }}>
                                    <ListItemText primary={book.description} secondary="description" />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button onClick={handleViewImage}>
                                <img
                                    src={book.coverImage}
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
                                        src={book.coverImage}
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
                </Container>
            }
        </React.Fragment>
    );
}
