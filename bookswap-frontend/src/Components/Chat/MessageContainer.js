import React from 'react';
import { Grid } from '@mui/material';
import {Typography} from '@mui/material';

export default function MessageContainer({ messages }) {
    return (
        <div>
            <Grid>
                    {messages && messages.map((msg, index) => (
                        <Grid item key={index}>                            
                            <Typography>{msg.msg} - {msg.userId}
                                </Typography>
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
}
