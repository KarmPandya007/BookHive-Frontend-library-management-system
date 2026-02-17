// Authentication utility functions
// This file manages JWT token storage and retrieval

const TOKEN_KEY = 'bookhive_auth_token';
const USER_KEY = 'bookhive_user';

export const authUtils = {
    // Store JWT token in localStorage
    setToken: (token: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(TOKEN_KEY, token);
        }
    },

    // Retrieve JWT token from localStorage
    getToken: (): string | null => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(TOKEN_KEY);
        }
        return null;
    },

    // Remove JWT token from localStorage
    removeToken: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(TOKEN_KEY);
        }
    },

    // Store user data
    setUser: (user: any) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
        }
    },

    // Get user data
    getUser: () => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem(USER_KEY);
            return user ? JSON.parse(user) : null;
        }
        return null;
    },

    // Remove user data
    removeUser: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(USER_KEY);
        }
    },

    // Clear all auth data
    clearAuth: () => {
        authUtils.removeToken();
        authUtils.removeUser();
    },

    // Check if user is authenticated
    isAuthenticated: (): boolean => {
        return !!authUtils.getToken();
    },

    // Get authorization header for API requests
    getAuthHeader: (): { Authorization: string } | {} => {
        const token = authUtils.getToken();
        return token ? { Authorization: `Bearer ${token}` } : {};
    },

    // Get user role
    getUserRole: (): string | null => {
        const user = authUtils.getUser();
        return user?.role || null;
    },

    // Check if user is admin
    isAdmin: (): boolean => {
        const user = authUtils.getUser();
        if (!user) {
            console.log("isAdmin: No user found in storage");
            return false;
        }

        // Handle both user.role and user.user.role if nested
        const role = (user.role || user.user?.role || '').toString().toLowerCase();
        console.log("isAdmin check for user:", user.name || user.email, "| Detected Role:", role);
        return role === 'admin';
    },

    // Check if user has specific role
    hasRole: (role: string): boolean => {
        const userRole = authUtils.getUserRole();
        return userRole === role;
    },
};
