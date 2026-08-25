// src/utils/ActiveStatusChecker.tsx
import { useState, useEffect } from 'react';
import api from '../_api/axios';

export interface User {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    username: string;
    email: string;
    role?: string;
    employee_id_no?: string;
    status?: string;
}

export function useCheckSession() {
    // 1. Instantly read from LocalStorage on initial load to prevent UI flickering
    const [isActive, setIsActive] = useState<boolean | null>(() => {
        return !!localStorage.getItem('auth_token');
    });
    
    const [user, setUser] = useState<User | null>(() => {
        try {
            const savedUser = localStorage.getItem('user_data');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        const token = localStorage.getItem('auth_token');

        console.log("🔍 [ActiveStatusChecker] Initiating Session Check...");
        
        if (!token) {
            console.warn("🛑 [ActiveStatusChecker] No token found! Skipping /user/me GET call.");
            setIsActive(false);
            setUser(null);
            localStorage.removeItem('user_data'); // Cleanup just in case
            return;
        }

        // 2. Perform background backend check to ensure token is still valid
        api.get('/user/me')
        .then((res) => {
            console.log("🟢 [ActiveStatusChecker] /user/me SUCCESS (200 OK):", res.data);
            setIsActive(true);
            setUser(res.data.user);
            
            // 3. Save the freshest data to local storage for the next refresh
            localStorage.setItem('user_data', JSON.stringify(res.data.user));
        })
        .catch((error) => {
            console.group("🔴 [ActiveStatusChecker] /user/me FAILED!");
            console.log("Full Error Object:", error);
            console.groupEnd();

            // If backend says 401 Unauthorized, wipe everything
            if (error.response?.status === 401) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user_data');
            }

            setIsActive(false);
            setUser(null);
        });
    }, []);

    return { isActive, user };
}