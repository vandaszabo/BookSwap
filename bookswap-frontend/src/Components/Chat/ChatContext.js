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
    const { authUser } = useAuth();

    useEffect(() => {
        const storedConnectionId = localStorage.getItem('connectionId');
        if (storedConnectionId) {
            const conn = new HubConnectionBuilder()
                .withUrl("http://localhost:5029/Chat")
                .configureLogging(LogLevel.Information)
                .build();

            conn.on("ReceivePrivateMessage", (userImage, msg) => {
                console.log("Private msg: ", userImage, msg);
                setMessages((messages) => [...messages, { userImage, msg }]);

            conn.on("GetConnectionId", (user, connectionId) => {
                console.log("GetClientConnId: ", user, connectionId);
                });
            });
            conn.start()
                .then(() => {
                    setConnection(conn)
                })
                .then(async () => {
                    const userId = authUser.id;
                    try {
                        const connId = await conn.invoke("GetConnectionId");
                        localStorage.setItem('connectionId', connId);
                        console.log("connectionid: ", connId);
                        updateConnID(userId, connId);
                    } catch (error) {
                        console.error(error);
                    }
                }).catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    const openChatConnection = async (userId) => {
        try {
            if (!conn) {
                const newConn = new HubConnectionBuilder()
                    .withUrl("http://localhost:5029/Chat")
                    .configureLogging(LogLevel.Information)
                    .build();

                newConn.on("ReceivePrivateMessage", (userImage, msg) => {
                    console.log("Private msg: ", userImage, msg);
                    setMessages((messages) => [...messages, { userImage, msg }]);
                });
                
                newConn.on("GetConnectionId", (user, connectionId) => {
                    console.log("GetClientConnId: ", user, connectionId);
                });

                await newConn.start();
                const connId = await newConn.invoke("GetConnectionId");
                console.log("connectionid: ", connId);
                await updateConnID(userId, connId);
                setConnection(newConn);
                localStorage.setItem('connectionId', connId);
            }

        } catch (error) {
            console.error(error);
        }
    };

    const updateConnID = async (userId, connectionId) => {
        try {
            const responseData = await updateUserConnection(userId, connectionId);
            console.log("Updated user(conn id): ", responseData);

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
                localStorage.removeItem('connectionId');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const sendToUser = async (data) => {
        try {
            if (conn) {
                await conn.invoke("GetClientConnectionId", data)
                await conn.invoke("SendToUser", data);

                setMessages((messages) => [...messages, { userImage: data.userImage, msg: data.msg }]);
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
        setMessages
    }

    return (
        <ChatContext.Provider value={value}>{props.children}</ChatContext.Provider>
    )
}

export { ChatProvider, useChat };
