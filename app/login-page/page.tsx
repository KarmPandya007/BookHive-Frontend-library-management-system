"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api";
import { authUtils } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
  LogIn,
  Mail
} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const identifier = form.identifier.trim();
    const payload: any = {
      password: form.password
    };

    // Determine payload based on input type to match backend expectations
    if (identifier.includes('@')) {
      payload.email = identifier;
      payload.id = identifier; // Fallback
    } else if (!isNaN(Number(identifier)) && identifier !== "") {
      payload.id = Number(identifier); // Send as number if numeric
      payload.email = identifier;
    } else {
      payload.id = identifier;
      payload.email = identifier;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json().catch(() => ({}));
      console.log("Login Response Data:", responseData); // Full debug log

      if (res.ok) {
        // Support common API response structures: { token, user } or { users: [...] }
        let user = responseData.user || responseData.data?.user;
        const token = responseData.token || responseData.data?.token;

        // NEW: Support for the "list of users" response format you provided
        if (!user && responseData.users && Array.isArray(responseData.users)) {
          const identifier = form.identifier.trim().toLowerCase();
          console.log("Searching for user matching:", identifier);

          // Find the user that matches either the entered email or the entered ID or the entered name
          user = responseData.users.find((u: any) =>
            u.email?.toLowerCase() === identifier ||
            u.id?.toString() === identifier ||
            u.name?.toLowerCase() === identifier
          );

          if (user) {
            console.log("Found matching user in list:", user.name, "with role:", user.role);
          } else {
            console.warn("No matching user found in the returned users list.");
          }
        }

        if (token) {
          authUtils.setToken(token);
        }

        if (user) {
          authUtils.setUser(user);
          const isAdmin = user.role?.toLowerCase() === 'admin';
          if (isAdmin) {
            toast.success(`Welcome back Admin, ${user.name}! Access granted.`);
          } else {
            toast.success(`Welcome back, ${user.name}!`);
          }
        }

        setTimeout(() => router.push("/allbooks"), 1200);
      } else {
        const msg = responseData.message || responseData.error || "Invalid credentials. Please try again.";
        toast.error(msg);
      }
    } catch (err) {
      toast.error("Unable to connect to the server. Please check your connection.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-muted/30 px-4 py-8 animate-in fade-in duration-700">
      <Card className="w-full max-w-md shadow-2xl border-primary/10">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your library account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="identifier"
                  name="identifier"
                  value={form.identifier}
                  onChange={handleChange}
                  required
                  placeholder="Email or Member ID"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-primary hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-9 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 text-lg" disabled={loading}>
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : (
                <LogIn className="h-5 w-5 mr-2" />
              )}
              {loading ? "Authenticating..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t bg-muted/20 p-6 rounded-b-xl text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account yet?{" "}
            <Link href="/signup-page" className="text-primary font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
