import React from 'react';
import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Advert from '../Components/Shared/Advert';
import { fetchMostPopularBook } from '../Utils/LikeFunctions';
import { fetchBookPostById } from '../Utils/BookFunctions';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/Authentication/AuthContext';

const Home = ({ setSelectedPost }) => {

  const [popularBook, setPopularBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuth();
  const navigate = useNavigate();

  //*********-------Find most popular post-------*********//
  useEffect(() => {

    const findMostPopular = async () => {
      try {
        const postId = await fetchMostPopularBook();
        if (postId != null) {
          const bookPost = await fetchBookPostById(postId);
          setPopularBook(bookPost);
          setSelectedPost(bookPost)
        }
      } catch (error) {
        console.error(`Error in findMostPopular: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    findMostPopular();
  }, []);



  return (
    <React.Fragment>
      {!authUser ? (navigate('/login')) : (
        <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
          <Container sx={{ backgroundColor: (theme) => theme.palette.secondary.beige, minHeight: '100vh' }}>
            <Box>
              {popularBook && !loading &&
                <Grid container spacing={4}>
                  {/* Card 1*/}
                  <Advert
                    title={"Do you have a book you don't read anymore?"}
                    description={"Upload it to our site and check out the offer."}
                    buttonText={"Upload Your Book"}
                    image={"https://th.bing.com/th/id/OIP.n3sAXxDyR0gM6xT1ZwmXdQHaE8?rs=1&pid=ImgDetMain"}
                    path={'/create'}
                  />
                  {/* Card 2*/}
                  <Advert
                    title={"Most Popular"}
                    description={`${popularBook.title} - ${popularBook.author}`}
                    buttonText={"View"}
                    image={popularBook.coverImage}
                    path={'/post'}
                  />
                  {/* Card 3*/}
                  <Advert
                    title={"Get a Book for Free!"}
                    description={"Swap without delivery fee"}
                    buttonText={"View Books in your City"}
                    image={"https://www.scalebloom.com/wp-content/uploads/2022/07/blog220723webdes-1-1.png"}
                    path={'/books'}
                  />
                  {/* Card 4*/}
                  <Advert
                    title={"Want to use it from your Phone?"}
                    description={"Browse from anywhere"}
                    buttonText={"Download the App"}
                    image={"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b0eb3857155439.5db0199390fe8.png"}
                    path={'/'}
                  />

                </Grid>}
            </Box>
          </Container>
        </Container>
      )}
    </React.Fragment>
  );
}

export default Home;
