import React from 'react';
import { Container, Typography } from '@mui/material';

const Home = ()=>{
    return(
        <React.Fragment>
        <Container component="main" maxWidth="lg" sx={{ mb: 4, textAlign: 'center'}}>
        <Typography variant='h5'>Home Page</Typography>
        {/* <img src="https://wallpapercave.com/wp/wp2036923.jpg" alt="Stack of Books" style={{ width: '100%', height: 'auto' }}/> */}
        </Container>
      </React.Fragment>
    )
}

export default Home;