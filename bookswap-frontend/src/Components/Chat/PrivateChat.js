import React from 'react';
import MessageContainer from './MessageContainer';
import { Typography, Button, Box } from '@mui/material';
import SendToUserForm from './SendToUserForm';
import { useChat } from './ChatContext';
import CloseIcon from '@mui/icons-material/Close';

export default function PrivateChat({ client }) {

    const { setReceivers } = useChat();

    return (
        <>
        {client && 
        <Box component="main" maxWidth="xs" sx={{ backgroundColor: (theme) => theme.palette.primary.main, p:1, borderRadius: '12px'}}>
            <Button sx={{display: 'flex', marginLeft:'auto', color: (theme) => theme.palette.primary.light }} onClick={() => setReceivers(prevReceivers => prevReceivers.filter(r => r.userId !== client.userId))}><CloseIcon /></Button>
            <Typography sx={{ display: 'flex', justifyContent: 'center', color: (theme) => theme.palette.primary.light }}>Chat with {client.userName}</Typography>
            <Box sx={{backgroundColor: (theme) => theme.palette.secondary.grey, p:2, borderRadius:'12px'}}>
            <MessageContainer client={client} />
            <SendToUserForm client={client} />
            </Box>
        </Box>
        }
        </>
    );
}
