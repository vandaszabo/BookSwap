import backendUrl from "./BackendUrl";

//*********-------API call for getting all user locations-------*********//
async function fetchAllLocations() {

    try {
        const response = await fetch(`${backendUrl}User/Location/List`, {
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
        console.error(`Error in fetchAllLocations: ${error.message}`);
    }
};

//*********-------API call for getting user by id-------*********//
async function fetchUserById(id) {

    try {
        const response = await fetch(`${backendUrl}User/${id}`, {
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
        console.error(`Error in fetchUserById: ${error.message}`);
    }
};

export { fetchAllLocations, fetchUserById };