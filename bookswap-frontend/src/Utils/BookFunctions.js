import { backendUrl, fetchData } from "./ApiHelper";

//*********-------API call for getting all existing Posts-------*********//
async function fetchBookListData() {
    const url = `${backendUrl}BookPost/List`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return await fetchData(url, options);
};

//*********-------API call for deleting Post-------*********//
async function deletePost(id) {
    const url = `${backendUrl}BookPost/Delete/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return await fetchData(url, options);
};

//*********-------API call for getting Posts by User location-------*********//
async function fetchPostsByLocation(userId, location) {
    const url = `${backendUrl}BookPost/User/${userId}/Location/${location}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return await fetchData(url, options);
};

//*********-------API call for getting user posts-------*********//
async function fetchUserPosts(id) {
    const url = `${backendUrl}BookPost/User/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return await fetchData(url, options);
}

//*********-------API call for get bookPost by id-------*********//
async function fetchBookPostById(id) {
    const url = `${backendUrl}BookPost/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return await fetchData(url, options);
}

export { fetchBookListData, fetchPostsByLocation, fetchUserPosts, deletePost, fetchBookPostById };