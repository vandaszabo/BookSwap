import React, { useEffect } from 'react';
import MessageContainer from './MessageContainer';
import { Typography, Container } from '@mui/material';
import SendToUserForm from './SendToUserForm';
import { useChat } from './ChatContext';
import { useAuth } from '../Authentication/AuthContext';

export default function PrivateChat({ sendToUser}){

    const {setReceiverId, messages, receiverName, setReceiverName} = useChat();
    const {authUser} = useAuth();
    let clientName = receiverName;

    useEffect(()=>{
        if(messages.length > 0){
            const clientId = messages[messages.length-1].senderId;
            clientName = messages[messages.length-1].senderName;
                console.log("Client id: ", clientId);
                console.log("Clientname: ", clientName);
                console.log("ReceiverName: ", receiverName);
            if(clientId !== authUser.id){
                setReceiverId(clientId)
                setReceiverName(clientName);
            };
        }

    },[messages]);
    


return(
    <Container component="main" maxWidth="xs" sx={{ backgroundColor: (theme) => theme.palette.secondary.grey }}>
        <Typography sx={{display: 'flex', justifyContent:'center'}}>Chat with {clientName}</Typography>
        <MessageContainer />
        <SendToUserForm sendToUser={sendToUser}/>
    </Container>
)
}