import React from 'react';
import { Container, Typography } from '@mui/material';

const Home = ()=>{

    return(
        <React.Fragment>
        <Container component="main" maxWidth="lg" sx={{ mb: 4, textAlign: 'center'}}>
        <Typography variant='h5'>Home Page</Typography>
        <Container>
          <Typography>More text here </Typography>
        </Container>
        </Container>
      </React.Fragment>
    )
}

export default Home;