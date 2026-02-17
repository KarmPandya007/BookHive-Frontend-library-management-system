"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authUtils } from '@/lib/auth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    requireAdmin?: boolean;
    redirectTo?: string;
}

export default function ProtectedRoute({
    children,
    requireAuth = true,
    requireAdmin = false,
    redirectTo = '/login-page'
}: ProtectedRouteProps) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            // Check if authentication is required
            if (requireAuth && !authUtils.isAuthenticated()) {
                router.push(redirectTo);
                return;
            }

            // Check if admin role is required
            if (requireAdmin && !authUtils.isAdmin()) {
                router.push('/allbooks'); // Redirect non-admins to all books page
                return;
            }

            setIsAuthorized(true);
            setIsLoading(false);
        };

        checkAuth();
    }, [requireAuth, requireAdmin, redirectTo, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Verifying access...</p>
                </div>
            </div>
        );
    }

    if (!isAuthorized) {
        return null;
    }

    return <>{children}</>;
}
