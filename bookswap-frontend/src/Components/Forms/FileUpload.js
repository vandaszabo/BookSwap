import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Input } from '@mui/material';

//*********-------main function for Upload Image file-------*********//
export default function FileUpload() {
  const [file, setFile] = useState('');

  const handleFile = (event) => {

    setFile(event.target.files[0])
    console.log(event.target.files[0]);
  };
  return (
    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{
      mt: 3,
      ml: 1,
      '&:hover': {
        backgroundColor: (theme) => theme.palette.secondary.light,
      },
    }}>
      Upload picture
      <Input 
      type="file" 
      onChange={handleFile}
      sx={{
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      }} />
    </Button>
  );
}
