"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Menu, X, Library, LogOut, User } from "lucide-react"
import { authUtils } from '@/lib/auth'
import { toast } from 'sonner'

const navLinks = [
    { label: "Home", href: "/", requireAuth: false, adminOnly: false },
    { label: "Explore", href: "/explorebooks", requireAuth: false, adminOnly: false },
    { label: "All Books", href: "/allbooks", requireAuth: true, adminOnly: false },
    { label: "Add Book", href: "/addbook", requireAuth: true, adminOnly: true },
    { label: "My History", href: "/myhistory", requireAuth: true, adminOnly: false },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [userName, setUserName] = useState<string>('')
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        // Check authentication status
        const authenticated = authUtils.isAuthenticated()
        const admin = authUtils.isAdmin()
        const user = authUtils.getUser()

        setIsAuthenticated(authenticated)
        setIsAdmin(admin)
        setUserName(user?.name || user?.email || 'User')
    }, [pathname]) // Re-check on route change

    const handleLogout = () => {
        authUtils.clearAuth()
        setIsAuthenticated(false)
        setIsAdmin(false)
        setUserName('')
        toast.success('Logged out successfully')
        router.push('/')
        setOpen(false)
    }

    // Filter nav links based on auth and role
    const visibleLinks = navLinks.filter(link => {
        if (link.requireAuth && !isAuthenticated) return false
        if (link.adminOnly && !isAdmin) return false
        return true
    })

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8 lg:px-12">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                        <div className="bg-primary rounded-lg p-1">
                            <Library className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">BookHive</span>
                    </Link>
                </div>

                {/* Desktop links */}
                <nav className="hidden md:flex items-center gap-1">
                    {visibleLinks.map((link) => (
                        <Button
                            key={link.href}
                            variant={pathname === link.href ? "secondary" : "ghost"}
                            asChild
                        >
                            <Link href={link.href}>{link.label}</Link>
                        </Button>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-3">
                    {isAuthenticated ? (
                        <>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-md">
                                <User className="h-4 w-4" />
                                <span className="text-sm font-medium">{userName}</span>
                                {isAdmin && (
                                    <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                                        Admin
                                    </span>
                                )}
                            </div>
                            <Button variant="ghost" onClick={handleLogout}>
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" asChild>
                                <Link href="/login-page">Login</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/signup-page">Get Started</Link>
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile controls */}
                <div className="md:hidden flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setOpen(prev => !prev)}
                        aria-label="Toggle menu"
                    >
                        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile menu panel */}
            {open && (
                <div className="md:hidden border-t bg-background p-4 animate-in slide-in-from-top duration-200">
                    <div className="flex flex-col gap-2">
                        {isAuthenticated && (
                            <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-md mb-2">
                                <User className="h-4 w-4" />
                                <span className="text-sm font-medium">{userName}</span>
                                {isAdmin && (
                                    <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                                        Admin
                                    </span>
                                )}
                            </div>
                        )}
                        {visibleLinks.map((link) => (
                            <Button
                                key={link.href}
                                variant={pathname === link.href ? "secondary" : "ghost"}
                                className="justify-start w-full"
                                asChild
                                onClick={() => setOpen(false)}
                            >
                                <Link href={link.href}>{link.label}</Link>
                            </Button>
                        ))}
                        <hr className="my-2" />
                        {isAuthenticated ? (
                            <Button variant="ghost" className="justify-start" onClick={handleLogout}>
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        ) : (
                            <>
                                <Button variant="ghost" className="justify-start" asChild onClick={() => setOpen(false)}>
                                    <Link href="/login-page">Login</Link>
                                </Button>
                                <Button className="justify-start" asChild onClick={() => setOpen(false)}>
                                    <Link href="/signup-page">Signup</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}

