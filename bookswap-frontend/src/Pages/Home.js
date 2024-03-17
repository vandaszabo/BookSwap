import React from 'react';
import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Advert from '../Components/Shared/Advert';
import { fetchMostPopularBook } from '../Utils/LikeFunctions';
import { fetchBookPostById } from '../Utils/BookFunctions';

const Home = ({ setSelectedPost }) => {

  const [popularBook, setPopularBook] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <Container sx={{ backgroundColor: (theme) => theme.palette.secondary.beige, minHeight: '100vh' }}>
          <Box>
            {popularBook && !loading &&
              <Grid container spacing={4}>
                {/* First Card */}
                <Advert
                  title={"Do you have a book you don't read anymore?"}
                  description={"Upload it to our site and check out the offer."}
                  buttonText={"Upload Your Book"}
                  image={"https://i.pinimg.com/736x/76/0a/ac/760aac017a832de893fed657fb6c111c--book-wallpaper-open-book.jpg"}
                  path={'/create'}
                />
                {/* Second Card */}
                <Advert
                  title={"Want to use it from your Phone?"}
                  description={"Browse from anywhere"}
                  buttonText={"Download the App"}
                  image={"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b0eb3857155439.5db0199390fe8.png"}
                  path={'/'}
                />
                {/* Third Card */}
                <Advert
                  title={"Get a Book for Free!"}
                  description={"Swap without delivery fee"}
                  buttonText={"View Books in your City"}
                  image={"https://www.scalebloom.com/wp-content/uploads/2022/07/blog220723webdes-1-1.png"}
                  path={'/books'}
                />
                {/* Third Card */}

                <Advert
                  title={"Most Popular"}
                  description={popularBook.title}
                  buttonText={"View"}
                  image={popularBook.coverImage}
                  path={'/post'}
                />
              </Grid>}
          </Box>
        </Container>
      </Container>
    </React.Fragment>
  );
}

export default Home;
