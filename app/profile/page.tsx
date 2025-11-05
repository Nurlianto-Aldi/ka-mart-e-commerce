"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Function to safely check localStorage during component initialization
const getInitialAuthStatus = () => {
    // Crucial: Only access browser APIs in the client environment
    if (typeof window !== 'undefined') {
        return !!localStorage.getItem('authToken');
    }
    return false; // Assumed state for server pre-render
};

const ProfilePage = () => {
    const router = useRouter();
    
    // Initialize state directly from the function. 
    // This runs ONCE during the initial render.
    const [isLoggedIn, setIsLoggedIn] = useState(getInitialAuthStatus()); 

    useEffect(() => {
        // We only need the side effect: redirection.
        // We do this check again here to handle scenarios where the token
        // might have expired or been removed by another tab/process.
        const token = localStorage.getItem('authToken');
        
        if (!token) {
            // Redirect the user if the token is missing.
            router.push('/login');
        }
        
        // No need for setIsLoading(false) because the loading check is simplified.
        
    }, [router]); // [router] is necessary because router.push is called inside the effect.

    // ----------------------------------------------------
    // --- Simplified Conditional Rendering ---
    
    // 1. Show nothing (null) or a simple loader while the client JS loads 
    //    and the useEffect has a chance to execute the redirect.
    //    We check for 'isLoggedIn' because it's initialized to the actual state.
    if (!isLoggedIn) {
        // If the initial state is false, show a loader briefly before the redirect fires.
        return (
             <div className="flex items-center justify-center h-screen">
                Redirecting to Login...
            </div>
        ); 
    }

    // 2. Render the protected content (Only runs if isLoggedIn is true)
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">Welcome to your Protected Profile!</h1>
            <p>You are viewing this page because a valid JWT token was found in your browser storage.</p>
            
            <button
                onClick={() => {
                    localStorage.removeItem('authToken');
                    router.push('/login');
                }}
                className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
                Logout
            </button>
        </div>
    );
};

export default ProfilePage;