import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function Review() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Post Summary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <List>
            <ListItem key="title" sx={{ py: 1, px: 0 }}>
              <ListItemText primary="The book of life" secondary="title" />
            </ListItem>

            <ListItem key="author" sx={{ py: 1, px: 0 }}>
              <ListItemText primary="John Author" secondary="author" />
            </ListItem>

            <ListItem key="category" sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Drama" secondary="category" />
            </ListItem>

            <ListItem key="pageCount" sx={{ py: 1, px: 0 }}>
              <ListItemText primary="254" secondary="pageCount" />
            </ListItem>
            <ListItem key="description" sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Once upon a time there was a book with a long description and a nice cover image." secondary="description" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={4}>
          <img
            src={`https://edit.org/images/cat/book-covers-big-2019101610.jpg`}
            alt="Book"
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
