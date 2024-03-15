import { React, useState } from 'react';
import { Container } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { Alert } from '@mui/material';
import UploadCoverImage from './UploadCoverImage';
import { useNavigate } from 'react-router-dom';
import NavigateBack from '../Shared/NavigateBack';

export default function PostEdit({ book }) {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [newCoverImage, setNewCoverImage] = useState(book.coverImage ?? "")
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newPost = {
            postId: book.postId,
            title: event.target.title.value,
            author: event.target.author.value,
            category: event.target.category.value,
            pageCount: event.target.pageCount.value,
            description: event.target.description.value,
            language: event.target.language.value,
            coverImage: newCoverImage,
        };

        try {
            if (newPost !== null && newPost !== book) {
                console.log(newPost);
                savePostData(newPost);
            }
        } catch (error) {
            console.error(`Error in handleSubmit: ${error.message}`);
            setError(error.message);
        }
    };

    const savePostData = (data) => {
        setLoading(true);

        fetch("http://localhost:5029/api/BookPost/Update", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log("Response (updated post): ", responseData);
                navigate('/profile');
            })
            .catch((error) => {
                console.error('Error saving userData:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Container component="main" maxWidth="md">
            <NavigateBack path={'/profile'} />
            <Card component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <CardContent>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        defaultValue={book.title}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="author"
                        label="Author"
                        name="author"
                        defaultValue={book.author}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="category"
                        label="Category"
                        name="category"
                        defaultValue={book.category}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="description"
                        label="Description"
                        id="description"
                        defaultValue={book.description}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="pageCount"
                        label="Page Count"
                        id="pageCount"
                        defaultValue={book.pageCount}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="language"
                        label="Language"
                        id="language"
                        defaultValue={book.language}
                    />
                    <UploadCoverImage 
                        setCoverImage={setNewCoverImage} 
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        sx={{
                            mt: 3,
                            mb: 2,
                            backgroundColor: (theme) => theme.palette.primary.main,
                            '&:hover': {
                                backgroundColor: (theme) => theme.palette.secondary.main,
                            },
                        }}
                    >
                        Save
                    </Button>
                </CardContent>
            </Card>
            {error && <Alert severity="error">{error}</Alert>}
        </Container>
    )
}