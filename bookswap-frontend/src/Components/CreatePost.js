import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PostForm from './Forms/PostForm';
import { ThemeProvider } from '@mui/material/styles';
import { useAuth } from './Authentication/AuthContext';
import FileUpload from './Forms/FileUpload';
import Review from './Forms/Review';
import { Alert } from '@mui/material';

const steps = ['Add information', 'Upload picture', 'Review'];

function getStepContent(step, bookPostData) {
  switch (step) {
    case 0:
      return <PostForm />;
    case 1:
      return <><h2>Please upload a cover image of your book</h2><FileUpload /></>;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export default function CreatePost({ myTheme, setShowCreatePost }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [bookPostData, setBookPostData] = useState({});
  const [error, setError] = useState("");
  const [coverImage, setCoverImage] = useState("url");
  const { authUser } = useAuth();
  console.log(authUser);

  const handleNext = () => {
    if (activeStep === 0) {
      const postData = PostForm.getData();
      setBookPostData(postData);
    }
    if (activeStep === 1) {
      console.log("review: ", bookPostData)
    }
    if (activeStep === 2) {
      handleCreatePost(bookPostData, coverImage, authUser.id)
      console.log("post create", bookPostData, coverImage, authUser.id);
    }

    setActiveStep((activeStep) => activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep((activeStep) => activeStep - 1);
  };

  async function handleCreatePost(data, image, userId) {
    try {
      const response = await fetch("http://localhost:5029/api/BookPost/Create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.title,
          author: data.author,
          description: data.description,
          category: data.category,
          language: data.language,
          pageCount: data.pageCount,
          coverImage: image,
          userId: userId
        }),
      });

      if (!response.ok) {
        setError("Invalid post data")
      }
      const responseData = await response.json();

      if (responseData !== null) {
        console.log("new post: ", responseData);
      }
    } catch (error) {
      console.error(`Error in createPost: ${error.message}`);
      setError(error.message);
    }
  };

  return (
    <ThemeProvider theme={myTheme}>
      <React.Fragment>
        <CssBaseline />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Create Post
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {!error ? (
              activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    You created a new post.
                  </Typography>
                  <Typography variant="subtitle1">
                    View other posts to find your new book.
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      onClick={() => setShowCreatePost(false)}
                      sx={{
                        '&:hover': {
                          backgroundColor: (theme) => theme.palette.secondary.light,
                        },
                      }}>
                      Close
                    </Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep, bookPostData)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{
                        mt: 3,
                        ml: 1,
                        '&:hover': {
                          backgroundColor: (theme) => theme.palette.secondary.light,
                        },
                      }}
                    >
                      {activeStep === steps.length - 1 ? 'Create' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
              )
            ) : (
            <>
            <Typography variant='h6'>Creation failed.</Typography>
              <Alert severity="error">{error}</Alert>
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
            </>
            )}

          </Paper>
        </Container>
      </React.Fragment>
    </ThemeProvider>
  );
}