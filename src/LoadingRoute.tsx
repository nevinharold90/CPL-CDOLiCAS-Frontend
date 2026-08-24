// src/components/LoadingRoute.tsx
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export function LoadingRoute() {
    const [loading, setLoading] = useState(true);
    const [redirectTo, setRedirectTo] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
        try {
            const user = JSON.parse(savedUser);
            const role = user?.role;

            if (role === 'superadmin' || role === 'admin') {
            setRedirectTo('/dashboard');
            } else if (role === 'client') {
            setRedirectTo('/');
            }
        } catch (e) {
            // Clear corrupt storage
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
        }
        }

        setLoading(false);
    }, []);

    // 1. Show loading screen during token check
    if (loading) {
        return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center font-[Poppins]">
            <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
            <p className="text-zinc-400 text-sm mt-4 animate-pulse">Loading...</p>
        </div>
        );
    }

    // 2. Auto-redirect if an active session exists
    if (redirectTo) {
        return <Navigate to={redirectTo} replace />;
    }

    // 3. Render page content if logged out
    return <Outlet />;
    }

export default LoadingRoute;