import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

function ImageForm({setCoverImage}) {
    const [imageUrl, setImageUrl] = useState('');

    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setCoverImage(imageUrl);
        console.log('Image URL submitted:', imageUrl);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                id="standard-basic"
                label="image url"
                variant="standard"
                value={imageUrl}
                onChange={handleImageUrlChange}
            />
            <Button type="submit">Submit</Button>
        </form>
    );
}

export default ImageForm;
