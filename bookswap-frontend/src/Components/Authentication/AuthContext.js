import React, { useState, useContext } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { updateUserConnection } from '../../Utils/UserFunctions';

//*********-------Creating a new React context named AuthContext-------*********//
const AuthContext = React.createContext();

//*********-------Custom hook named useAuth to easily access the AuthContext-------*********//
function useAuth() {
    return useContext(AuthContext);
};

//*********-------This component provides authentication-related context to its children-------*********//
function AuthProvider(props) {
    const storedUser = localStorage.getItem('authUser');
    const userObject = storedUser ? JSON.parse(storedUser) : null;

    const [authUser, setAuthUser] = useState(userObject);
    const [isLoggedIn, setIsLoggedIn] = useState(!!userObject);
    const [conn, setConnection] = useState();
    const [messages, setMessages] = useState([]);

    const openChatConnection = async (userId) => {
        try {
            //initiate connection
            const conn = new HubConnectionBuilder()
                .withUrl("http://localhost:5029/Chat")
                .configureLogging(LogLevel.Information)
                .build();

            conn.on("ReceivePrivateMessage", (userImage, msg) =>{
                console.log("Private msg: ", userImage, msg);

                setMessages((messages) => [...messages, { userImage, msg }]);
            });

            await conn.start();
            const connId = await conn.invoke("GetConnectionId");
            console.log("connectionid: ", connId);
            await updateConnID(userId, connId);
            setConnection(conn);

        } catch (error) {
            console.error(error);
        }
    };

    const updateConnID = async(userId, connectionId) => {
        try {
            const responseData = await updateUserConnection(userId, connectionId);
            console.log("Updated user(conn id): ",responseData);

        } catch (error) {
            console.error(error);
        }

    }

    const closeChatConnection = async () => {
        try {
            if (conn) {
                await conn.stop();
                setConnection(null);
                await updateConnID(null);
                setMessages([]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const sendToUser = async(userImage, receiverConnId, msg)=>{
        try {
            await conn.invoke("SendToUser", userImage, receiverConnId, msg);
            setMessages((messages) => [...messages, { userImage, msg }]);
        } catch (error) {
            console.error(error);
        }
    };

    //*********-------Creating an object 'value' to be passed as the value prop to AuthContext.Provider-------*********//
    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
        openChatConnection,
        closeChatConnection,
        sendToUser,
        messages
    }

    //*********-------Wrapping the children components with AuthContext.Provider, passing the 'value' object-------*********//
    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}

export { AuthProvider, useAuth };