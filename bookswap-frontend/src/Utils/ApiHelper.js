const backendUrl = process.env.REACT_APP_BACKEND_URL;

async function fetchData(url, options) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data !== null) {
            return data;
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

export { backendUrl, fetchData };
