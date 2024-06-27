import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Filters from '../Components/Books/Filters';
import Album from '../Components/Books/Album';
import { useAuth } from '../Components/Authentication/AuthContext';
import BooksForYou from '../Components/Books/BooksForYou';

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

export default function AllBooks({ books, setSelectedPost }) {

    const [filteredBooks, setFilteredBooks] = useState(null);
    const { authUser } = useAuth();
    const navigate = useNavigate();

    const handleView = (book) => {
        setSelectedPost(book);
        console.log(book)
        navigate('/post');
    };

    return (
        <React.Fragment>
            <Container
                component="main"
                maxWidth="lg"
                sx={{ mb: 4, mt: 4 }}>
                <Container>
                    <Box
                        sx={{
                            display: 'flex',
                            display: 'flex',
                            flexDirection: {
                                        xs: 'column',
                                        sm: 'column',
                                        md: 'row',
                                        lg: 'row'
                            },
                            height: 'fit-content',
                            color: (theme) => theme.palette.primary.main,
                            backgroundColor: (theme) => theme.palette.secondary.beige,
                            alignItems: 'center',
                            '@media (maxWidth: 600px)': {
                                flexDirection: 'column-reverse', // Stack image below text on smaller screens
                                height: 'auto',
                            },
                        }}

                    >
                        <Box sx={{m: 2}}>
                            <Typography
                                component="h5"
                                variant="body1"
                                align="center"
                                gutterBottom
                                sx={{
                                    fontSize: {
                                        xs: '1.5rem',
                                        sm: '1.5rem',
                                        md: '2rem',
                                        lg: '2.2rem',
                                    },
                                }}
                            >
                                Find your new favourite book!
                            </Typography>
                            <Typography
                                variant="body2"
                                align="center"
                                paragraph
                                sx={{
                                    fontSize: '1.2rem',
                                    fontWeight: 600
                                }}>
                                Like the post that interests you and get likes from others. If there is a match, you can decide to exchange the books.
                            </Typography>
                        </Box>
                        <Box>
                            <img
                                src="https://cdn.dribbble.com/users/486498/screenshots/11951875/media/ba889cb7336c75a8cfa54656dc912bd9.jpg?compress=1&resize=700x525&vertical=center"
                                alt="reading-woman"
                                style={{
                                    width: '80%',
                                    height: 'auto',
                                    display: 'block',
                                    margin: '0 auto'                                 }}
                            />
                        </Box>
                    </Box>

                    {/* Filtering options */}
                    <Filters
                        books={books} setFilteredBooks={setFilteredBooks}
                    />

                    {/* Filtering results */}
                    {filteredBooks && <Album title='Search results' books={filteredBooks} onView={handleView}/>}

                    {/* Same City */}
                    {authUser && <BooksForYou onView={handleView} />}

                    {/* All post */}
                    <Album title='All Book Posts' books={books} onView={handleView} />

                </Container>

                {/* Footer */}
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