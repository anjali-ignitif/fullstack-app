export const fetchData = async (endpoint: string) => {
    const BASE_URL = "http://<YOUR-EC2-PUBLIC-IP>:5000";

    const response = await fetch(`${BASE_URL}/${endpoint}`);
    return await response.json();
};
