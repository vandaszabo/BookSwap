import { backendUrl, fetchData } from "./ApiHelper";

async function fetchAllLocations() {
    const url = `${backendUrl}User/Location/List`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return await fetchData(url, options);
}

async function fetchUserById(id) {
    const url = `${backendUrl}User/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return await fetchData(url, options);
}

async function updateUserConnection(userId, connectionId) {
    const url = `${backendUrl}User/UpdateConnection`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, connectionId })
    };
    return await fetchData(url, options);
}

export { fetchAllLocations, fetchUserById, updateUserConnection };