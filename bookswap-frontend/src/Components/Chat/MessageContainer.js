import React, { useEffect, useRef, useState } from 'react';
import { Grid } from '@mui/material';
import { Typography, Avatar, Box } from '@mui/material';
import { useChat } from './ChatContext';
import { useAuth } from '../Authentication/AuthContext';

export default function MessageContainer({client}) {
    const { messages } = useChat();
    const {authUser} = useAuth();
    const messagesEndRef = useRef(null);
    const [filtered, setFiltered] = useState(null);

    // Scroll to the bottom of the container when messages change
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Select the messages between authUser and Client
    useEffect(() => {
        scrollToBottom();
        if(messages.length > 0){
            const filtered = messages.filter(m => 
                (m.senderId === client.userId && m.receiverId === authUser.id) ||
                (m.senderId === authUser.id && m.receiverId === client.userId))   
            setFiltered(filtered);
        }
    }, [messages, setFiltered, client.userId, authUser.id]);

    return (
        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <Grid>
                {filtered && filtered.map((msg, index) => (
                    <Grid item key={index}>
                        
                        {/* Own messages */}
                        {msg.senderId === authUser.id ? (
                            <Box display="flex" alignItems="center" justifyContent="flex-end">
                                <Box sx={{ backgroundColor: (theme) => theme.palette.secondary.darkGrey, color: (theme) => theme.palette.primary.light, pr: '10px', pl: '10px', ml: '5px', mb: '5px', borderRadius: '12px', display: 'flex', justifyContent: 'center' }}>
                                    <Typography>{msg.msg}</Typography>
                                </Box>
                            </Box>
                        ) : (

                            // Received messages
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
