import React, { useEffect, useRef } from 'react';
import MessageContainer from './MessageContainer';
import { Typography, Container } from '@mui/material';
import SendToUserForm from './SendToUserForm';
import { useChat } from './ChatContext';
import { useAuth } from '../Authentication/AuthContext';

export default function PrivateChat({ sendToUser }) {
    const { setReceiverId, messages, receiverName, setReceiverName } = useChat();
    const { authUser } = useAuth();
    const clientNameRef = useRef(receiverName);

    useEffect(() => {
        if (messages.length > 0) {
            const clientId = messages[messages.length - 1].senderId;
            const clientName = messages[messages.length - 1].senderName;
            console.log("Client id: ", clientId);
            console.log("Clientname: ", clientName);
            console.log("ReceiverName: ", receiverName);
            if (clientId !== authUser.id) {
                setReceiverId(clientId);
                setReceiverName(clientName);
                clientNameRef.current = clientName; // Update the ref with new value
            }
        }
    }, [messages, authUser.id, setReceiverId, receiverName, setReceiverName]);

    return (
        <Container component="main" maxWidth="xs" sx={{ backgroundColor: (theme) => theme.palette.primary.fair }}>
            <Typography sx={{ display: 'flex', justifyContent: 'center' }}>Chat with {clientNameRef.current}</Typography>
            <MessageContainer />
            <SendToUserForm sendToUser={sendToUser} />
        </Container>
    );
}
