import React from 'react';
import MessageContainer from './MessageContainer';
import { Typography, Container } from '@mui/material';
import SendToUserForm from './SendToUserForm';

export default function PrivateChat({messages, sendToUser}){

return(
    <Container component="main" maxWidth="xs" sx={{ mb: 4, backgroundColor: (theme) => theme.palette.secondary.grey }}>
        <Typography sx={{display: 'flex', justifyContent:'center'}}>Chat</Typography>
        <MessageContainer messages={messages} />
        <SendToUserForm sendToUser={sendToUser}/>
    </Container>
)
}