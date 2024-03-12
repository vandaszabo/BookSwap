import * as React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export default function Album({ title, books, onView }) {
    return (
        <React.Fragment>
            <Container
                sx={{ py: 8, color: (theme) => theme.palette.primary.main }}
                maxWidth="lg">
                <Typography variant='h6'>{title}</Typography>
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
            </Container>
        </React.Fragment>
    )
}


