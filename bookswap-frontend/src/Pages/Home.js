import React from 'react';
import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const Home = () => {
  return (
    <React.Fragment>
      <Container component="main" maxWidth="lg" sx={{ mt:4, mb: 4, textAlign: 'center' }}>
        <Container>
          <Box>
            <Grid container spacing={4}>
              {/* First Card */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', maxWidth: '100%' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '200px',
                      width: '100%',
                      background: `url("https://img.freepik.com/premium-vector/stack-old-books-vector-illustration_995012-322.jpg") center/cover no-repeat`,
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div">
                      Do you have a book you don't read anymore?
                    </Typography>
                    <Typography variant="body2">Upload it to our site and check out the offer.</Typography>
                  </CardContent>
                  <CardActions>
                    <Button sx={{ textTransform: 'none', width: '100%' }} variant='contained'>
                      Upload Your Book
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              {/* Second Card */}
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', maxWidth: '100%' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '200px',
                      width: '100%',
                      background: `url("https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b0eb3857155439.5db0199390fe8.png") center/cover no-repeat`,
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div">
                    Want to use it from your phone?
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant='contained' sx={{ textTransform: 'none', width: '100%' }}>
                      Download the App
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Container>
    </React.Fragment>
  );
}

export default Home;
