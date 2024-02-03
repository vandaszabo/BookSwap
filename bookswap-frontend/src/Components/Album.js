import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { FormControl } from '@mui/material';
import { MenuItem } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { createTheme, ThemeProvider } from '@mui/material/styles';

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

export default function Album({ theme, books }) {

    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [likes, setLikes] = useState({});

    const handleChangeGenre = (event) => {
        setSelectedGenre(event.target.value);
    };

    const handleChangeLanguage = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const handleLikeButtonClick = (bookId) => {
        setLikes(prevLikes => {
            const updatedLikes = { ...prevLikes };
            updatedLikes[bookId] = !updatedLikes[bookId];
            return updatedLikes;
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h2"
                            variant="h5"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Find your new favourite book!
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
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
                            <Grid item key={`${book.id}_${index}`} xs={12} sm={6} md={4}>
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
                                        image={book.coverImage}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {book.title}
                                        </Typography>
                                        <Typography>
                                            {book.author}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                    <Button size="small">View</Button>
                                    <IconButton
                                        aria-label="Add to favorites"
                                        onClick={() => handleLikeButtonClick(book.id)}
                                    >
                                        {likes[book.id] ? (
                                            <FavoriteIcon color="primary" />
                                        ) : (
                                            <FavoriteBorderIcon color="primary" />
                                        )}
                                    </IconButton>
                                </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            <Box sx={{ bgcolor: 'background.paper', p: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }} component="footer">
                <Button onClick={topFunction}>Back to top</Button>
            </Box>
        </ThemeProvider>
    );
}