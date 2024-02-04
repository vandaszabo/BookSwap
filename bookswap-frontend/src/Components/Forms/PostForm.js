import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

//*********-------main function for BookPost data Form-------*********//
export default function PostForm() {

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        category: '',
        pageCount: '',
        language: '',
    });

    //*********-------Added getData method to the PostForm object to retrieve the current value of formData whenever it's called-------*********//
    PostForm.getData = () => formData;

    //*********-------Handle text changes in Form inputs-------*********//
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Book details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="title"
                        name="title"
                        label="Title"
                        fullWidth
                        autoComplete="title"
                        variant="standard"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="author"
                        name="author"
                        label="Author(s)"
                        fullWidth
                        autoComplete="author"
                        variant="standard"
                        value={formData.author}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="description"
                        name="description"
                        label="Description (story plot, book condition, opinion)"
                        fullWidth
                        autoComplete="description"
                        variant="standard"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="category"
                        name="category"
                        label="Genre(s)"
                        fullWidth
                        autoComplete="category"
                        variant="standard"
                        value={formData.category}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="pageCount"
                        name="pageCount"
                        label="Number of Pages"
                        fullWidth
                        autoComplete="pageCount"
                        variant="standard"
                        value={formData.pageCount}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="language"
                        name="language"
                        label="Language"
                        fullWidth
                        autoComplete="language"
                        variant="standard"
                        value={formData.language}
                        onChange={handleInputChange}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}