import React, { useRef } from 'react';
import MessageContainer from './MessageContainer';
import { Typography, Container } from '@mui/material';
import SendToUserForm from './SendToUserForm';

export default function PrivateChat({ client }) {

    const clientNameRef = useRef(client.userName);    

    return (
        <Container component="main" maxWidth="xs" sx={{ backgroundColor: (theme) => theme.palette.primary.fair }}>
            <Typography sx={{ display: 'flex', justifyContent: 'center' }}>Chat with {clientNameRef.current}</Typography>
            <MessageContainer client={client}/>
            <SendToUserForm client={client}/>
        </Container>
    );
}
