// api.ts

export const fetchData = async (endpoint: string) => {
    try {
        const response = await fetch(`/api/${endpoint}`);

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
