import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormControl } from '@mui/material';
import { MenuItem } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { useAuth } from './Authentication/AuthContext';

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

export default function Album({ books }) {

    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [favorites, setFavorites] = useState([]);
    const { authUser } = useAuth();

    const handleChangeGenre = (event) => {
        setSelectedGenre(event.target.value);
    };

    const handleChangeLanguage = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const handleLike = (bookId) => {
        console.log("add to favorites: ", bookId);
        setFavorites(prev => [...prev, bookId]);
    };

    const handleView = (bookId) => {
        console.log("view this with details: ", bookId);
    };


    return (
        <React.Fragment>
        <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
            <Box>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        mt: 8,
                        mb: 2,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h5"
                            variant="body1"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Find your new favourite book!
                        </Typography>
                        <Typography variant="body2" align="center" color="text.secondary" paragraph>
                            Like the post that interests you and get likes from others. If there is a match, you can decide to exchange the books.
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="genre">Genre</InputLabel>
                                <Select
                                    labelId="genre"
                                    id="demo-select-small"
                                    value={selectedGenre}
                                    label="Age"
                                    onChange={handleChangeGenre}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"fantasy"}>Fantasy</MenuItem>
                                    <MenuItem value={"scifi"}>Sci-fi</MenuItem>
                                    <MenuItem value={"romantic"}>Romantic</MenuItem>
                                    <MenuItem value={"adventure"}>Adventure</MenuItem>
                                    <MenuItem value={"drama"}>Drama</MenuItem>
                                    <MenuItem value={"crime"}>Crime</MenuItem>
                                    <MenuItem value={"thriller"}>Thriller</MenuItem>
                                    <MenuItem value={"biography"}>Biography</MenuItem>
                                    <MenuItem value={"psychology"}>Psychology</MenuItem>
                                    <MenuItem value={"children"}>Children's Literature</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="language">Language</InputLabel>
                                <Select
                                    labelId="language"
                                    id="demo-select-small"
                                    value={selectedLanguage}
                                    label="Age"
                                    onChange={handleChangeLanguage}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"en"}>English</MenuItem>
                                    <MenuItem value={"hun"}>Hungarian</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {books && books.map((book, index) => (
                            <Grid item key={`${book.postId}_${index}`} xs={6} sm={4} md={3} lg={3}>
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
                                        }}
                                        image={book.coverImage}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="body1" component="div">
                                            {book.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {book.author}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={() => handleView(book.postId)} size="small">View</Button>
                                        <Button onClick={() => handleLike(book.postId)} size="small">Like</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
            <Box sx={{ bgcolor: 'background.paper', p: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }} component="footer">
                <Button onClick={topFunction}>Back to top</Button>
            </Box>
            </Container>
        </React.Fragment>
    );
}