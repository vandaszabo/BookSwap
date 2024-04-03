import React, { useRef } from 'react';
import MessageContainer from './MessageContainer';
import { Typography, Container, Button } from '@mui/material';
import SendToUserForm from './SendToUserForm';
import { useChat } from './ChatContext';
import CloseIcon from '@mui/icons-material/Close';

export default function PrivateChat({ client }) {

    const { setReceivers } = useChat();
    const clientNameRef = useRef(client.userName);

    return (
        <Container component="main" maxWidth="xs" sx={{ backgroundColor: (theme) => theme.palette.primary.fair, p: 1 }}>
            <Button sx={{display: 'flex', marginLeft:'auto'}} onClick={() => setReceivers(prevReceivers => prevReceivers.filter(r => r.userId !== client.userId))}><CloseIcon /></Button>
            <Typography sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>Chat with {clientNameRef.current}</Typography>
            <MessageContainer client={client} />
            <SendToUserForm client={client} />
        </Container>
    );
}
