// api.js

const BASE_URL = '/api/';

export const fetchData = async (endpoint: string) => {
    try {
        let url = BASE_URL + endpoint
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
