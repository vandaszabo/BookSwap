import React from 'react';
import MessageContainer from './MessageContainer';
import { Typography, Container, Button } from '@mui/material';
import SendToUserForm from './SendToUserForm';
import { useChat } from './ChatContext';
import CloseIcon from '@mui/icons-material/Close';

export default function PrivateChat({ client }) {

    const { setReceivers } = useChat();

    return (
        <>
        {client && 
        <Container component="main" maxWidth="xs" sx={{ backgroundColor: (theme) => theme.palette.primary.fair, p: 1, borderRadius: '12px' }}>
            <Button sx={{display: 'flex', marginLeft:'auto'}} onClick={() => setReceivers(prevReceivers => prevReceivers.filter(r => r.userId !== client.userId))}><CloseIcon /></Button>
            <Typography sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>Chat with {client.userName}</Typography>
            <MessageContainer client={client} />
            <SendToUserForm client={client} />
        </Container>
        }
        </>
    );
}
