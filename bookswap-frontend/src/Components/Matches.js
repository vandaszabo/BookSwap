import * as React from 'react';
import { useState, useEffect } from 'react';
import { fetchUserById } from '../Utils/UserFunctions';
import { Button, Paper, Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { useChat } from './Chat/ChatContext';
import ChatIcon from '@mui/icons-material/Chat';

export default function Matches({ userIds }) {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { messages, setReceiverId, setReceiverName } = useChat();

    useEffect(() => {
        const findUsers = async () => {
            try {
                const users = [];
                for (const id of userIds) {
                    const user = await fetchUserById(id);
                    users.push(user);
                }
                setUsers(users);

            } catch (error) {
                console.error(`Error in findUsers: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        findUsers();
    }, [userIds, messages]);

    const handleChatClick = (userId, userName) => {
        console.log("received id ",userId);
        setReceiverId(userId);
        console.log("received name ",userName);
        setReceiverName(userName);
    };

    return (
        <React.Fragment>
            <Typography color='primary' variant='h6' sx={{ mt: 4, mb: 2, borderBottom: '2px solid', borderColor: (theme) => theme.palette.secondary.light }}>Arrange Swap with Them</Typography>
            <Grid container spacing={4}>
                {!loading && users && users.map((user, index) => (
                    <Grid
                        item
                        key={`${user.id}_${index}`}
                        xs={6}
                        sm={4}
                        md={3}
                        lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    marginBottom: '16px',
                                }}
                            >
                                <img
                                    src={user.profileImage}
                                    alt={user.userName}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <Typography variant="body1" component="div">
                                {user.connectionID && <CircleIcon sx={{ color: (theme) => theme.palette.secondary.green }} />}
                                {user.userName}
                            </Typography>
                            <Typography variant="body2" component="div">
                                {user.city}
                            </Typography>
                            {user.connectionID && (
                                <Box>
                                    <Button sx={{ cursor: 'pointer' }} onClick={() => handleChatClick(user.id, user.userName)}>
                                        <ChatIcon />
                                    </Button>
                                </Box>
                            )}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
}