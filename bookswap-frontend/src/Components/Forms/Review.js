import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

//*********-------Main function for Review data for Creating new Post-------*********//
export default function Review({bookData, image}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Post Summary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <List>
            <ListItem key="title" sx={{ py: 1, px: 0 }}>
              <ListItemText primary={bookData.title} secondary="title" />
            </ListItem>

            <ListItem key="author" sx={{ py: 1, px: 0 }}>
              <ListItemText primary={bookData.author} secondary="author" />
            </ListItem>

            <ListItem key="category" sx={{ py: 1, px: 0 }}>
              <ListItemText primary={bookData.category} secondary="category" />
            </ListItem>

            <ListItem key="pageCount" sx={{ py: 1, px: 0 }}>
              <ListItemText primary={bookData.pageCount} secondary="pageCount" />
            </ListItem>
            <ListItem key="description" sx={{ py: 1, px: 0 }}>
              <ListItemText primary={bookData.description} secondary="description" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={4}>
          <img
            src={image}
            alt="cover-image"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
