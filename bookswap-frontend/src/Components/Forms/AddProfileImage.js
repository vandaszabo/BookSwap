import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import { useAuth } from '../Authentication/AuthContext';

//*********-------main function for Upload Image file-------*********//
export default function AddProfileImage() {

  const [selectedFile, setSelectedFile] = useState('');
  const [loading, setLoading] = useState(false);
  const {authUser, setAuthUser} = useAuth();


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  };

  const handleUpload = () => {
    // Send the file to the server
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile, selectedFile.name);
  
      // Set loading state to true before making the fetch request
      setLoading(true);
  
      fetch('http://localhost:5029/api/User/Upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`Error uploading file: ${response.statusText}`);
          }
        })
        .then((responseData) => {
          const imageUrl = responseData.s3Url;
          console.log('File uploaded successfully');
          setAuthUser(prevAuthUser => ({ ...prevAuthUser, profileImage: imageUrl}))
          console.log(imageUrl);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        })
        .finally(() => {
          // Set loading state to false after the upload is complete (or in case of an error)
          setLoading(false);
        });       

    } else {
      console.log('No file selected');
    }
  };
  
  //Image should assigned to user in database
  const AddUserDetails = (userDetails) =>{
    fetch('http://localhost:5029/api/User/AddDetails', {
        method: 'POST',
        body: userDetails,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`Error uploading file: ${response.statusText}`);
          }
        })
        .then((responseData) => {
          const imageUrl = responseData;
          console.log('File uploaded successfully');
          setAuthUser(prevAuthUser => ({ ...prevAuthUser, profileImage: imageUrl.s3Url}))
          console.log(imageUrl);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        })
        .finally(() => {
          // Set loading state to false after the upload is complete (or in case of an error)
          setLoading(false);
        });
};


  return (
    <div>
      <h5>Change picture</h5>
      {selectedFile && <img
            src={URL.createObjectURL(selectedFile)}
            alt="cover-image"
            style={{ width: '100px', height: 'auto' }}
          />}
      <Input
        type="file"
        onChange={handleFileChange}
        />

      <Button
        component="label"
        variant="contained"
        onClick={handleUpload}
        disabled={loading}
        sx={{
          mt: 3,
          ml: 1,
          '&:hover': {
            backgroundColor: (theme) => theme.palette.secondary.light,
          },
        }}>
        Upload
      </Button>

    </div>
  );
}
