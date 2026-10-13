import axios from "axios";

const API_URL = "http://localhost:8001/api/auth";

export const checkSession = async (): Promise<boolean> => {
    try {
        await axios.get(`${API_URL}/session-check`, { withCredentials: true });
        return true;
    } catch (error) {
        return false;
    }
};