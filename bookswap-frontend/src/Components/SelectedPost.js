import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

//*********-------Main function for Review data for Creating new Post-------*********//
export default function SelectedPost({ book }) {
    return (
        <React.Fragment>
            {book &&
                <Container component="main" maxWidth="lg" sx={{ mb: 4, mt: 8 }}>
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
                            <img
                                src={book.coverImage}
                                alt="cover-image"
                                style={{
                                    maxWidth: '50%',
                                    height: 'auto',
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            }
        </React.Fragment>
    );
}
