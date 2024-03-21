import React from 'react';
import MessageContainer from './MessageContainer';
import { Typography, Box } from '@mui/material';
import SendToUserForm from './SendToUserForm';

export default function PrivateChat({messages, sendToUser}){

return(
    <Box sx={{ backgroundColor: "#ffb6c1"}}>
        <Typography sx={{display: 'flex', justifyContent:'center'}}>Private Chatroom</Typography>
        <MessageContainer messages={messages} />
        <SendToUserForm sendToUser={sendToUser}/>
    </Box>
)
}