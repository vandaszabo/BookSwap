import backendUrl from "./BackendUrl";

//*********-------API call for getting all existing Posts-------*********//
async function fetchBookListData() {
    try {
        const response = await fetch(`${backendUrl}BookPost/List`, {
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
        console.error(`Error in fetchBookListData: ${error.message}`);
    }
};

//*********-------API call for deleting Post-------*********//
async function deletePost(id) {
    try {
        const response = await fetch(`${backendUrl}BookPost/Delete/${id}`, {
            method: 'DELETE',
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
        console.error(`Error in deletePost: ${error.message}`);
    }
};

//*********-------API call for getting Posts by User location-------*********//
async function fetchPostsByLocation(userId, location) {

    try {
        const response = await fetch(`${backendUrl}BookPost/User/${userId}/Location/${location}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data !== null) {
            return data;
        }

    } catch (error) {
        console.error(`Error in fetchPostsByLocation: ${error.message}`);
    }

};

//*********-------API call for getting user posts-------*********//
async function fetchUserPosts(id) {

    try {
        const response = await fetch(`${backendUrl}BookPost/User/${id}`, {
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
        console.error(`Error in fetchUserPosts: ${error.message}`);
    }
}

export { fetchBookListData, fetchPostsByLocation, fetchUserPosts, deletePost };