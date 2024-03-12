import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import Step from '@mui/material/Step';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Review from '../Components/Forms/Review';
import CreatePostForm from '../Components/Forms/CreatePostForm';
import { useAuth } from '../Components/Authentication/AuthContext';
import UploadCoverImage from '../Components/Forms/UploadCoverImage';

const steps = ['Add information', 'Upload picture', 'Review'];

//*********-------Steps for creating BookPost-------*********//
function getStepContent(step, formProps) {
  switch (step) {
    case 0:
      return <CreatePostForm formData={formProps.formData} setFormData={formProps.setFormData} />;
    case 1:
      return <>
      {formProps.coverImage ? <img src={formProps.coverImage} width='30%' alt="Cover Image" /> :
        <h2>Please upload a cover image of your book</h2>
      }
        <UploadCoverImage setCoverImage={formProps.setCoverImage} />
      </>;
    case 2:
      return <Review bookData={formProps.bookPostData} image={formProps.coverImage} />;
    default:
      throw new Error('Unknown step');
  }
}


//*********-------Main function for post creation-------*********//
export default function CreatePost({ setCreated }) {

  const { authUser } = useAuth();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [bookPostData, setBookPostData] = useState({});
  const [error, setError] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    pageCount: '',
    language: '',
  });

  const formProps = {
    formData,
    setFormData,
    bookPostData,
    coverImage,
    setCoverImage
  };

  //*********-------Next or Back button handling-------*********//
  const handleNext = () => {
    if (activeStep === 0) {
      setBookPostData(formData);
    }
    if (activeStep === 1) {
      console.log("review: ", bookPostData, coverImage)
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

  //*********-------API call for creating BookPost-------*********//
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
        console.log("Id of new post: ", responseData);
        setCreated(true);
      }
    } catch (error) {
      console.error(`Error in createPost: ${error.message}`);
      setError(error.message);
    }
  };

  return (
    <React.Fragment>
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
                    onClick={() => navigate('/')}
                    sx={{
                      '&:hover': {
                        backgroundColor: (theme) => theme.palette.secondary.main,
                      },
                    }}>
                    Close
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, formProps)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={activeStep === 1 && !coverImage ? true : false}
                    sx={{
                      mt: 3,
                      ml: 1,
                      '&:hover': {
                        backgroundColor: (theme) => theme.palette.secondary.main,
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
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" onClick={() => window.location.reload()} sx={{
                  mt: 3,
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.secondary.main,
                  },
                }}>
                  Try again
                </Button>
              </Box>
            </>
          )}

        </Paper>
      </Container>
    </React.Fragment>
  );
}