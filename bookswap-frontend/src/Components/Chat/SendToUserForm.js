import { TextField } from '@mui/material';
import { React, useState } from 'react';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { useAuth } from '../Authentication/AuthContext';

const SendToUserForm = ({ sendToUser }) => {
  const [msg, setMessage] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const { authUser } = useAuth();

  const handleSend = (e) => {
    try {
      const requestData = {
        userId: authUser.id,
        userImage: authUser.profileImage,
        receiverId: receiverId,
        msg: msg
      };
      console.log("request data:", requestData);

      e.preventDefault();
      sendToUser(requestData);
      setMessage('');
      // setReceiverId('');

    } catch (error) {
      console.error("Cannot send message");
    }
  };


  return (
    <Box component="form" onSubmit={handleSend}>
      <TextField onChange={(e) => setReceiverId(e.target.value)} type='text' value={receiverId} placeholder="Add receiver Id" fullWidth></TextField>
      <TextField onChange={(e) => setMessage(e.target.value)} type='text' value={msg} placeholder="Enter a message" fullWidth></TextField>
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

export default SendToUserForm;