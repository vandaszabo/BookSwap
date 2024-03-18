import { TextField } from '@mui/material';
import { React, useState} from 'react';
import {Box} from '@mui/material';
import {Button} from '@mui/material';

const SendMessageForm = ({sendMessage}) =>{
    const [msg, setMessage] = useState('');

    const handleSend = (e) =>{
        e.preventDefault();
        sendMessage(msg);
        setMessage('');
    };


    return(
        <Box component="form" onSubmit={handleSend}>
        <TextField onChange={ (e) => setMessage(e.target.value) } type='text' value={msg} placeholder="Enter a message" fullWidth></TextField>
        <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!msg}
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: (theme) => theme.palette.primary.main,
              '&:hover': {
                backgroundColor: (theme) => theme.palette.secondary.main,
              },
            }}
          >Send</Button>
          </Box>
        )
}

export default SendMessageForm;