import React from 'react';
import MessageContainer from './MessageContainer';
import { Typography, TextField, Button, Box } from '@mui/material';

export default function ChatRoom({messages}){

return(
    <Box sx={{ backgroundColor: "#add8e6"}}>
        <Typography sx={{display: 'flex', justifyContent:'center'}}>Private chatroom</Typography>
        <MessageContainer messages={messages} />
        <TextField margin="normal" label="Enter a message" fullWidth></TextField>
        <Button
            type="submit"
            variant="contained"
            color="primary"
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