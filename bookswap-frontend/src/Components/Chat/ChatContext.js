import React, { useState, useEffect, useContext } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { updateUserConnection } from '../../Utils/UserFunctions';
import { useAuth } from '../Authentication/AuthContext';

const ChatContext = React.createContext();

function useChat() {
    return useContext(ChatContext);
};

function ChatProvider(props) {
    const [conn, setConnection] = useState();
    const [messages, setMessages] = useState([]);
    const [receiverId, setReceiverId] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const { authUser } = useAuth();
    const userId = authUser.id;

    useEffect(() => {
        const storedConnectionId = localStorage.getItem('senderConnectionId');
        if (storedConnectionId) {
            const initializeConnection = async () => {
                await createConnection(userId);
            };

            initializeConnection();
        }
    }, []);

    const createConnection = async (userId) => {
        try {
            const newConn = new HubConnectionBuilder()
                .withUrl("http://localhost:5029/Chat")
                .configureLogging(LogLevel.Information)
                .build();

            //Handle message sending-receiving
            newConn.on("ReceivePrivateMessage", (userImage, msg) => {
                console.log("Received message:", msg);
                setMessages((messages) => [...messages, { userImage, msg }]);
            });

            //Get Receiver connection Id from db
            newConn.on("GetConnectionId", (user, connectionId) => {
                localStorage.setItem("receiverConnectionId", connectionId);
            });

            //Start connection
            await newConn.start();

            //Get own connection Id and Update it in db
            const connId = await newConn.invoke("GetOwnConnectionId");
            await updateConnID(userId, connId);
            localStorage.setItem('senderConnectionId', connId);
            setConnection(newConn);
        } catch (error) {
            console.error(error);
        }
    };


    const openChatConnection = async (userId) => {
        try {
            if (!conn) {
                await createConnection(userId);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const updateConnID = async (userId, connectionId) => {
        try {
            await updateUserConnection(userId, connectionId);

        } catch (error) {
            console.error(error);
        }
    };

    const closeChatConnection = async (userId) => {
        try {
            if (conn) {
                await conn.stop();
                setConnection(null);
                await updateConnID(userId, null);
                setMessages([]);
                localStorage.removeItem('senderConnectionId');
                localStorage.removeItem('receiverConnectionId');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const sendToUser = async (requestData, detailData) => {
        try {
            if (conn) {
                await conn.invoke("GetClientConnectionId", requestData.receiverId)
                const receiverConnId = localStorage.getItem("receiverConnectionId");
                await conn.invoke("SendToUser", requestData, receiverConnId);
                setMessages((messages) => 
                [...messages, 
                {
                    userId: requestData.userId, 
                    userImage: requestData.userImage,
                    userName: detailData.userName,
                    receiverName: detailData.receiverName,
                    receiverId: detailData.receiverId,
                    msg: requestData.msg 
                }]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const value = {
        conn,
        setConnection,
        openChatConnection,
        closeChatConnection,
        sendToUser,
        messages,
        setMessages,
        receiverId,
        setReceiverId,
        receiverName,
        setReceiverName
    }

    return (
        <ChatContext.Provider value={value}>{props.children}</ChatContext.Provider>
    )
}

export { ChatProvider, useChat };
