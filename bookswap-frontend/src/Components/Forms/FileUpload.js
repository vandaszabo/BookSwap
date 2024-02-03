import * as React from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Input } from '@mui/material';

export default function FileUpload() {
    return (
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{
            mt: 3,
            ml: 1,
            '&:hover': {
              backgroundColor: (theme) => theme.palette.secondary.light,
            },
          }}>
            Upload picture
            <Input type="file" sx={{
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
