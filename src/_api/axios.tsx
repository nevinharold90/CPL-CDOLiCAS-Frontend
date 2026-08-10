// src/api/axios.ts
import axios from 'axios';

    const api = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_API, // Laravel API base URL
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        withCredentials: true, // Configured ONC entire app
    });

export default api;