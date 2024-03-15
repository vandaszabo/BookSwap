import backendUrl from "./BackendUrl";

//*********-------API call for getting all post likers (list of user ids)-------*********//
async function fetchPostLikers(postId) {

    try {
        const response = await fetch(`${backendUrl}Like/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data !== null) {
            return data;
        }

    } catch (error) {
        console.error(`Error in fetchPostLikers: ${error.message}`);
    }
}

//*********-------API call for getting the most popular post(id)-------*********//
async function fetchMostPopularBook() {

    try {
        const response = await fetch(`${backendUrl}Like/Popular/BookPost`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data !== null) {
            return data;
        }

    } catch (error) {
        console.error(`Error in fetchPostLikers: ${error.message}`);
    }
}

//*********-------API call for Adding Like to a post-------*********//
async function createLike(userId, postId){

    try {
        const response = await fetch(`${backendUrl}Like/Add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, postId}),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data !== null) {
            console.log("Data ", data)
            return data;
        }

    } catch (error) {
        console.error(`Error in CreateLike: ${error.message}`);
    }
}

//*********-------API call for Removing like-------*********//
async function removeLike(userId, postId){

    try {
        const response = await fetch(`${backendUrl}Like/Delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, postId}),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data !== null) {
            console.log("Deleted Like data ", data)
            return data;
        }

    } catch (error) {
        console.error(`Error in CreateLike: ${error.message}`);
    }
}

//*********-------API call for getting liked posts-------*********//
async function fetchFavorites(userId) {

    try {
        const response = await fetch(`${backendUrl}Like/Posts/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data !== null) {
            return data;
        }

    } catch (error) {
        console.error(`Error in fetchFavorites: ${error.message}`);
    }
}



export { fetchPostLikers, createLike, fetchFavorites, removeLike, fetchMostPopularBook };