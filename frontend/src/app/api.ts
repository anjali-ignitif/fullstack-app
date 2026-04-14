export const fetchData = async (endpoint: string) => {
    const BASE_URL = "http://13.232.82.206:5000";

    const response = await fetch(`${BASE_URL}/${endpoint}`);
    return await response.json();
};
