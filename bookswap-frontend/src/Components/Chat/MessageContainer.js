import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { Typography, Avatar, Box } from '@mui/material';
import { useChat } from './ChatContext';

export default function MessageContainer() {

    const {messages, setMessages} = useChat();

    useEffect(()=>{
        console.log(messages);
        if(messages.length > 5){
            setMessages((messages) => messages.slice(-5));
        }
    },[messages, setMessages]);

    return (
        <div>
            <Grid>
                {messages && messages.map((msg, index) => (
                    <Grid item key={index}>
                        {msg.userName && !msg.userImage ?
                            <Typography>{msg.userName} - {msg.msg} </Typography>
                            :
                            <Box display="flex" alignItems="center">
                                <Avatar
                                    alt="user"
                                    src={msg.userImage
                                        ? msg.userImage
                                        : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"}
                                />
                                <Box sx={{ backgroundColor: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.light, pr: '10px', pl: '10px', ml:'5px', borderRadius: '12px', display: 'flex', justifyContent: 'center' }}><Typography>  {msg.msg} </Typography></Box>
                                
                            </Box>}
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
