export const fetchData = async (endpoint: string) => {
    try {
        const response = await fetch(`/api/${endpoint}`);  // ✅ IMPORTANT

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
