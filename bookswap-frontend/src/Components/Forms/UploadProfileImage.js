import * as React from 'react';
import { useState } from 'react';
import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import { useAuth } from '../Authentication/AuthContext';


//*********-------main function for Upload Image file-------*********//
export default function UploadProfileImage({setEditingPhoto}) {

  const [selectedFile, setSelectedFile] = useState('');
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser} = useAuth();

  const userDetails = {
    userId: authUser.id,
    city: authUser.city,
    profileImage: authUser.profileImage
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  };

  const uploadImageToS3 = (formData) => {
    setLoading(true);
  
    fetch('http://localhost:5029/api/File/Upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseData) => {

        const imageUrl = responseData.s3Url;
        console.log('File uploaded successfully');
        const updatedUserDetails = { ...userDetails, profileImage: imageUrl };

        setAuthUser((prevAuthUser) => ({
          ...prevAuthUser, profileImage: imageUrl
        }));
        localStorage.setItem('details', JSON.stringify(updatedUserDetails));

        storeImageUrlInDb(updatedUserDetails);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      })
      .finally(() => {
        setLoading(false);
        setEditingPhoto(false);
      });
  };
  

  //Image should assigned to user in database
  const storeImageUrlInDb = (userDetails) => {
    fetch('http://localhost:5029/api/User/UpdateDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails)
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Successfully stored URL in database");
        console.log("Updated details: ",responseData);
      })
      .catch((error) => {
        console.error('Error storing image URL in the database:', error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpload = () => {
    // Send the file to the server
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile, selectedFile.name);
      formData.append('imageCategory', 'ProfileImage');

      uploadImageToS3(formData);
    } else {
      console.log('No file selected');
    }
  };

  return (
    <div>
      <h5>Change picture</h5>
      {selectedFile && <img
        src={URL.createObjectURL(selectedFile)}
        alt="user"
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
