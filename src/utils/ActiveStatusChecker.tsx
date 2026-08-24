// src/utils/ActiveStatusChecker.tsx
import { useState, useEffect } from 'react';
import api from '../_api/axios';

export function useCheckSession() {
    const [isActive, setIsActive] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');

        console.log("🔍 [ActiveStatusChecker] Initiating Session Check...");
        console.log("🔑 [ActiveStatusChecker] Token in LocalStorage:", token ? `Exists (${token.substring(0, 15)}...)` : "NULL");

        if (!token) {
        console.warn("🛑 [ActiveStatusChecker] No token found! Skipping /user/me GET call.");
        setIsActive(false);
        return;
        }

        // Attempt backend verification call
        api.get('/user/me')
        .then((res) => {
            console.log("🟢 [ActiveStatusChecker] /user/me SUCCESS (200 OK):", res.data);
            setIsActive(true);
        })
        .catch((error) => {
            console.group("🔴 [ActiveStatusChecker] /user/me FAILED!");
            console.log("Full Error Object:", error);

            if (error.response) {
            console.log("HTTP Status Code:", error.response.status);
            console.log("Backend Response Headers:", error.response.headers);
            console.log("Backend Response Body:", error.response.data);

            if (error.response.status === 401) {
                console.error("⚠️ 401 Unauthorized: The bearer token sent was invalid, expired, or rejected by Laravel Sanctum.");
                console.log("Request Headers sent by Axios:", error.config?.headers);
            }
            } else if (error.request) {
            console.error("Network Error: Request was made but no response was received from backend.");
            } else {
            console.error("Setup Error:", error.message);
            }
            console.groupEnd();

            setIsActive(false);
        });
    }, []);

    return isActive;
}