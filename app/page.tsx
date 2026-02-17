"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  BookOpen,
  Search,
  PlusCircle,
  Zap,
  ShieldCheck,
  Clock,
  Library,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid-slate-100 mask-[linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:mask-[linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6 py-1 px-4 text-sm gap-2 animate-bounce">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Empowering Modern Libraries
          </Badge>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Your Gateway to <br /> Infinite Knowledge
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover, manage, and explore a vast universe of books with BookHive's intelligent library management system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full group" asChild>
              <Link href="/allbooks">
                Browse Collection
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full" asChild>
              <Link href="/login-page">
                Member Login
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Powerful Features for Readers</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We've built everything you need to manage your reading journey seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-background">
              <CardHeader>
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Smart Search</CardTitle>
                <CardDescription>
                  Find any book instantly by title, author, category, or ISBN with our powerful search engine.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-background">
              <CardHeader>
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                  <PlusCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Easy Management</CardTitle>
                <CardDescription>
                  Add new books to your collection with a few clicks. Manage inventory and stock effortlessly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-background">
              <CardHeader>
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Digital Tracking</CardTitle>
                <CardDescription>
                  Track issued books, return dates, and availability in real-time across your entire library.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y bg-background overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold tracking-tighter text-primary">10k+</div>
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Books</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold tracking-tighter text-primary">5k+</div>
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Members</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold tracking-tighter text-primary">24/7</div>
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Access</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold tracking-tighter text-primary">Secure</div>
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Designed for the Modern Age</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-2">
              <Zap className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-bold">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Optimized for speed and seamless interactions.</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-bold">Data Security</h3>
              <p className="text-sm text-muted-foreground">Your library records are protected and encrypted.</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-bold">24/7 Availability</h3>
              <p className="text-sm text-muted-foreground">Access your portal anytime, from any device.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 container mx-auto px-4 mb-20">
        <div className="rounded-3xl bg-primary px-6 py-16 md:px-12 md:py-24 text-center text-primary-foreground relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 opacity-10">
            <Library className="h-96 w-96 transform rotate-12" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Ready to Start Your Journey?</h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 font-medium">
              Join thousands of readers and library administrators today. BookHive is the most intuitive management system on the market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-bold" asChild>
                <Link href="/signup-page">Create Free Account</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors" asChild>
                <Link href="/allbooks">Search Library</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t mt-auto">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-1">
              <Library className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">BookHive</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 BookHive Library Management System. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground font-medium">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
