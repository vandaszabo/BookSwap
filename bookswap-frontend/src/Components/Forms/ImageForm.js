import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

//*********-------main function for Image link input field-------*********//
function ImageForm({setCoverImage}) {
    const [imageUrl, setImageUrl] = useState('');

    //*********-------handle change url in the textfield-------*********//
    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value);
    };

    //*********-------Submit the final url for CoverImage-------*********//
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
