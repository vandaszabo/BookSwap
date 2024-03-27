import { backendUrl, fetchData } from "./ApiHelper";

//*********-------API call for getting all post likers (list of user ids)-------*********//
async function fetchPostLikers(postId) {
    const url = `${backendUrl}Like/${postId}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return await fetchData(url, options);
}

//*********-------API call for getting the most popular post(id)-------*********//
async function fetchMostPopularBook() {
    const url = `${backendUrl}Like/Popular/BookPost`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return await fetchData(url, options);
}

//*********-------API call for Adding Like to a post-------*********//
async function createLike(userId, postId){
    const url = `${backendUrl}Like/Add`;
    const options = {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, postId}),
    };
    return await fetchData(url, options);
}

//*********-------API call for Removing like-------*********//
async function removeLike(userId, postId){
    const url = `${backendUrl}Like/Delete`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, postId}),
    };
    return await fetchData(url, options);
}

//*********-------API call for getting liked posts-------*********//
async function fetchFavorites(userId) {
    const url = `${backendUrl}Like/Posts/${userId}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return await fetchData(url, options);
}


export { fetchPostLikers, createLike, fetchFavorites, removeLike, fetchMostPopularBook };