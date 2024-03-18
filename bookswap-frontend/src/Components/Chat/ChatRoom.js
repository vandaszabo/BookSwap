import React from 'react';
import MessageContainer from './MessageContainer';
import { Typography, Box } from '@mui/material';
import SendMessageForm from './SendMessageForm';

export default function ChatRoom({messages, sendMessage}){

return(
    <Box sx={{ backgroundColor: "#add8e6"}}>
        <Typography sx={{display: 'flex', justifyContent:'center'}}>Private chatroom</Typography>
        <MessageContainer messages={messages} />
        <SendMessageForm sendMessage={sendMessage}/>
    </Box>
)
}