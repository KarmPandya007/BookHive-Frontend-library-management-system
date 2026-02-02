
import "./globals.css";
import type { Metadata } from 'next';
import Navbar from './components/Navbar';
import photo from "./assets/large.png";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "BookHive - Library Management System",
  description: "A comprehensive library management system for managing books and resources",
  icons: {
    icon: photo.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <Navbar />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
