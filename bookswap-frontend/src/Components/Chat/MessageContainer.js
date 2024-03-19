import React from 'react';
import { Grid } from '@mui/material';
import { Typography, Avatar, Box } from '@mui/material';

export default function MessageContainer({ messages }) {
    return (
        <div>
            <Grid>
                {messages && messages.map((msg, index) => (
                    <Grid item key={index}>
                        {msg.userName ?
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
