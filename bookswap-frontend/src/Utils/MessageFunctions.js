import { backendUrl } from "./ApiHelper";

//*********-------API call for Creating a Message-------*********//
async function sendMessageToDb(senderId, receiverId, msg){
    try {
        const response = await fetch(`${backendUrl}Message/Create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({senderId, receiverId, msg})
        })
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data;
        
    } catch (error) {
        console.error(`Error in sendMessageToDb: ${error.message}`);
    }
    
}

//*********-------API call for Creating a Message-------*********//
async function getUnDelivered(userId){
    try {
        const response = await fetch(`${backendUrl}Message/UnDelivered/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        })
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data;
        
    } catch (error) {
        console.error(`Error in sendMessageToDb: ${error.message}`);
    }
    
}

export {sendMessageToDb, getUnDelivered}