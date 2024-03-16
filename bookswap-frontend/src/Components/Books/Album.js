import * as React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import {Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Alert } from '@mui/material';

export default function Album({ title, books, onView }) {
    return (
        <React.Fragment>
            <Box
                sx={{ mt: 2, py: 2, color: (theme) => theme.palette.secondary.darkGrey }}
                maxWidth="lg">
                <Typography variant='h6' sx={{ mb: 2, borderBottom: '2px solid', borderColor: (theme) => theme.palette.secondary.light }}>{title}</Typography>
                {books && books.length === 0 && <Alert severity='info'> No match</Alert>}
                <Grid container spacing={4}>
                    {books && books.map((book, index) => (
                        <Grid
                            item
                            key={`${book.postId}_${index}`}
                            xs={6}
                            sm={4}
                            md={3}
                            lg={2}>
                            <Card
                                onClick={() => onView(book)}
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                            >
                                <CardMedia
                                    component="div"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '200px',
                                        background: `url(${book.coverImage}) center/cover no-repeat`,
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="body1" component="div">
                                        {book.title}
                                    </Typography>
                                    <Typography variant="body2" component="div">
                                        {book.author}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </React.Fragment>
    )
}


