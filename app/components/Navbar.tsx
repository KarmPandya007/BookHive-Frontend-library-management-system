"use client"

import { useState } from 'react'
import Link from 'next/link'
import photo from "../assets/large.png";

export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <header className="bg-teal-600 text-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-20 py-3 sm:py-4">
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-3">
                            <img
                                src={photo.src}
                                alt="BookHive"
                                className="h-12 w-12 sm:h-10 sm:w-10 transform transition-transform duration-200 ease-in-out hover:scale-110 focus:scale-110"
                            />
                    </Link>
                </div>

                {/* Desktop links */}
                <nav className="hidden md:flex items-center gap-6 text-sm sm:text-base md:text-lg">
                    <Link href="/" className="">Home</Link>
                    <Link href="/addbook" className="">Add Book</Link>
                    <Link href="/allbooks" className="">All Books</Link>
                    <Link href="/signup-page" className="">Signup</Link>
                    <Link href="/login-page" className="">Login</Link>
                </nav>

                {/* Mobile controls */}
                <div className="md:hidden flex items-center">
                    <button
                        aria-label="Toggle menu"
                        onClick={() => setOpen(prev => !prev)}
                        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        {open ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile menu panel */}
            {open && (
                <div className="md:hidden bg-teal-600 border-t border-teal-500">
                    <div className="px-4 pt-3 pb-4 space-y-1">
                        <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-700">Home</Link>
                        <Link href="/addbook" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-700">Add Book</Link>
                        <Link href="/allbooks" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-700">All Books</Link>
                        <Link href="/signup-page" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-700">Signup</Link>
                        <Link href="/login-page" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-700">Login</Link>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { transform: translateY(-12px); opacity: 0 }
                    to { transform: translateY(0); opacity: 1 }
                }
                .animate-fadeIn { animation: fadeIn 600ms ease-in-out }
            `}</style>
        </header>
    )
}

