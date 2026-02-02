"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import photo from "../assets/large.png";
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explorebooks" },
    { label: "All Books", href: "/allbooks" },
    { label: "Add Book", href: "/addbook" },
    { label: "My History", href: "/myhistory" },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8 lg:px-12">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                        <img
                            src={photo.src}
                            alt="BookHive"
                            className="h-8 w-8 rounded-lg object-contain"
                        />
                        <span className="text-xl font-bold tracking-tight text-primary">BookHive</span>
                    </Link>
                </div>

                {/* Desktop links */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
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
                    <Button variant="ghost" asChild>
                        <Link href="/login-page">Login</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/signup-page">Get Started</Link>
                    </Button>
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
                        {navLinks.map((link) => (
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
                        <Button variant="ghost" className="justify-start" asChild onClick={() => setOpen(false)}>
                            <Link href="/login-page">Login</Link>
                        </Button>
                        <Button className="justify-start" asChild onClick={() => setOpen(false)}>
                            <Link href="/signup-page">Signup</Link>
                        </Button>
                    </div>
                </div>
            )}
        </header>
    )
}

