import React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function BookInfo({book}){
    return(
        <Grid item xs={12} md={8}>

        <Typography sx={{ fontSize: '25px', mt: 1 }} >
            {book.title}
        </Typography>

        <Typography sx={{ fontSize: '20px', mt: 1 }} >
            {book.author}
        </Typography>

        <Typography sx={{ fontSize: '15px', mt: 1 }} >
            Category/Genre: {book.category}
        </Typography>

        <Typography sx={{ fontSize: '15px', mt: 1 }} >
            Language: {book.language}
        </Typography>

        <Typography sx={{ fontSize: '15px' }} >
            Number of pages: {book.pageCount}
        </Typography>
        <Typography sx={{ fontSize: '15px', mt: 2, }} >
            {book.description}
        </Typography>

    </Grid>
    )
};