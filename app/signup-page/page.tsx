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
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Fingerprint,
  Lock,
  Loader2,
  UserPlus
} from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    id: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.address || !form.id || !form.password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: Number(form.phone),
          address: form.address,
          id: Number(form.id),
          password: form.password,
        }),
      });

      if (res.ok) {
        const responseData = await res.json().catch(() => ({}));

        if (responseData.token) {
          authUtils.setToken(responseData.token);
        }

        // The entire response (minus success/message/token) or specific fields
        authUtils.setUser({
          _id: responseData._id,
          name: responseData.name,
          email: responseData.email,
          id: responseData.id,
          role: responseData.role
        });

        toast.success("Account created successfully! Welcome to BookHive.");
        setTimeout(() => router.push("/explorebooks"), 1300);
      } else {
        const json = await res.json().catch(() => null);
        const message = json?.message || "Registration failed. Please try again.";
        toast.error(message);
      }
    } catch (err) {
      toast.error("Unable to connect to the server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-muted/30 px-4 py-12 animate-in fade-in duration-700">
      <Card className="w-full max-w-xl shadow-2xl border-primary/10">
        <CardHeader className="space-y-1 text-center font-sans">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
            <UserPlus className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">Create Account</CardTitle>
          <CardDescription>
            Join BookHive to manage your reading history and explore new titles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Jane Doe"
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="jane@example.com"
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="9123456780"
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="id">Member ID (Numeric)</Label>
                <div className="relative">
                  <Fingerprint className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="id"
                    name="id"
                    type="number"
                    value={form.id}
                    onChange={handleChange}
                    required
                    placeholder="1001"
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  placeholder="Street, City, State"
                  className="pl-9 min-h-[80px] resize-none pt-2.5"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  placeholder="Create a strong password"
                  className="pl-9"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-11 text-lg" disabled={loading}>
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : (
                <UserPlus className="h-5 w-5 mr-2" />
              )}
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t bg-muted/20 p-6 rounded-b-xl text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login-page" className="text-primary font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
