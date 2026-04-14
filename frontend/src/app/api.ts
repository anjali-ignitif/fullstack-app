export const fetchData = async (endpoint: string) => {
    const response = await fetch(`/api/${endpoint}`);
    return await response.json();
};
// test change
