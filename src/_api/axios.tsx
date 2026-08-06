// src/api/axios.ts
import axios from 'axios';

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        withCredentials: true, // Configured ONCE for your entire app
    });

export default api;