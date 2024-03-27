import React, { useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import { Typography, Avatar, Box } from '@mui/material';
import { useChat } from './ChatContext';
import { useAuth } from '../Authentication/AuthContext';

export default function MessageContainer() {
    const { messages } = useChat();
    const messagesEndRef = useRef(null);
    const {authUser} = useAuth();

    // Scroll to the bottom of the container when messages change
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <Grid>
                {messages && messages.map((msg, index) => (
                    <Grid item key={index}>
                        {msg.senderId === authUser.id ? (
                            <Box display="flex" alignItems="center" justifyContent="flex-end">
                                <Box sx={{ backgroundColor: (theme) => theme.palette.secondary.darkGrey, color: (theme) => theme.palette.primary.light, pr: '10px', pl: '10px', ml: '5px', mb: '5px', borderRadius: '12px', display: 'flex', justifyContent: 'center' }}>
                                    <Typography>{msg.msg}</Typography>
                                </Box>
                            </Box>
                        ) : (
                            <Box display="flex" alignItems="center">
                                <Avatar
                                    alt="user"
                                    src={msg.senderImage
                                        ? msg.senderImage
                                        : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"}
                                />
                                <Box sx={{ backgroundColor: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.light, pr: '10px', pl: '10px', ml: '5px', borderRadius: '12px', display: 'flex', justifyContent: 'center' }}>
                                    <Typography>{msg.msg}</Typography>
                                </Box>
                            </Box>
                        )}
                    </Grid>
                ))}
                <div ref={messagesEndRef} />
            </Grid>
        </div>
    );
}
