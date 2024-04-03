import React, { useEffect, useRef } from 'react';
import MessageContainer from './MessageContainer';
import { Typography, Container } from '@mui/material';
import SendToUserForm from './SendToUserForm';
import { useChat } from './ChatContext';
import { useAuth } from '../Authentication/AuthContext';

export default function PrivateChat() {
    const { setReceiverId, messages, setMessages, receiverName, setReceiverName } = useChat();
    const { authUser } = useAuth();
    const clientNameRef = useRef(receiverName);

    //clientNameRef gets updated whenever receiverName changes
    useEffect(() => {
        clientNameRef.current = receiverName;
        const newMessages = messages.filter(message => message.senderName === receiverName);
        setMessages(newMessages);
    }, [receiverName, setMessages]);

    // Handle chat with multiple users 
    // For now It is removing the previous conversation when a message comes from a different user, 
    // Planned to handle it with multiple chat windows int the future
    useEffect(() => {
        // Filter out the user's own messages
        const filtered = messages.filter(message => message.senderId !== authUser.id);
    
        if (filtered.length > 1) { // Check if there are at least 2 non-user messages
            const lastSenderId = filtered[filtered.length - 1].senderId;
            const secondLastSenderId = filtered[filtered.length - 2].senderId;
    
            if (lastSenderId !== secondLastSenderId) { // Check if last two messages are from different senders
                const currentSenderId = filtered[filtered.length - 1].senderId;
                // Filter out all messages except the last one from the current sender
                const clearedMessages = filtered.filter(message => message.senderId === currentSenderId);

                // Update Messages array with the new messages
                setMessages(clearedMessages);

                // Update Receiver
                setReceiverId(currentSenderId);
                setReceiverName(filtered[filtered.length - 1].senderName);
                clientNameRef.current = filtered[filtered.length - 1].senderName;
            }
        } else if (filtered.length === 1) { // If there's only one non-user message
            const clientId = filtered[0].senderId;
            const clientName = filtered[0].senderName;
            setReceiverId(clientId);
            setReceiverName(clientName);
            clientNameRef.current = clientName;
        }
    }, [messages, authUser.id, setReceiverId, setReceiverName, setMessages]);
    
    

    return (
        <Container component="main" maxWidth="xs" sx={{ backgroundColor: (theme) => theme.palette.primary.fair }}>
            <Typography sx={{ display: 'flex', justifyContent: 'center' }}>Chat with {clientNameRef.current}</Typography>
            <MessageContainer />
            <SendToUserForm />
        </Container>
    );
}
