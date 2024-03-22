import React from 'react';
import MessageContainer from './MessageContainer';
import { Typography, Container } from '@mui/material';
import SendToUserForm from './SendToUserForm';

export default function PrivateChat({ sendToUser}){

return(
    <Container component="main" maxWidth="xs" sx={{ backgroundColor: (theme) => theme.palette.secondary.grey }}>
        <Typography sx={{display: 'flex', justifyContent:'center'}}>Chat</Typography>
        <MessageContainer />
        <SendToUserForm sendToUser={sendToUser}/>
    </Container>
)
}