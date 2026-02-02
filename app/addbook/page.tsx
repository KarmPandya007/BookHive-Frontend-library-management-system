"use client";

import React, { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/lib/api';
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
  BookPlus,
  User,
  Info,
  Tag,
  Hash,
  Database,
  ArrowLeft
} from "lucide-react";
import Link from 'next/link';

const AddBookPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    isbn: '',
    totalCopies: '',
    availableCopies: '',
    issuedCount: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["totalCopies", "availableCopies", "issuedCount"].includes(name) ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Book successfully added to the library!');
        setFormData({
          title: '',
          author: '',
          description: '',
          category: '',
          isbn: '',
          totalCopies: '',
          availableCopies: '',
          issuedCount: '',
        });
        setTimeout(() => {
          router.push('/allbooks');
        }, 2000);
      } else {
        toast.error('Failed to add book. Please check your data.');
      }
    } catch (error) {
      toast.error('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/allbooks">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Book</h1>
          <p className="text-muted-foreground">Expand your library's digital collection.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" /> General Information
                </CardTitle>
                <CardDescription>Enter the basic details of the book.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Book Title</Label>
                  <div className="relative">
                    <BookPlus className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. The Great Gatsby"
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="e.g. F. Scott Fitzgerald"
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Short summary of the book content..."
                    className="min-h-[120px] resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary" /> Classification
                </CardTitle>
                <CardDescription>Help readers find the book easily.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Fiction, Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="isbn">ISBN</Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="isbn"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleChange}
                      placeholder="978-0-..."
                      className="pl-9 font-mono"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" /> Inventory
                </CardTitle>
                <CardDescription>Manage book copies.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="totalCopies">Total Copies</Label>
                  <Input
                    id="totalCopies"
                    type="number"
                    name="totalCopies"
                    value={formData.totalCopies}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availableCopies">Available</Label>
                  <Input
                    id="availableCopies"
                    type="number"
                    name="availableCopies"
                    value={formData.availableCopies}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issuedCount">Issued Count</Label>
                  <Input
                    id="issuedCount"
                    type="number"
                    name="issuedCount"
                    value={formData.issuedCount}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                  />
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button type="submit" className="w-full h-12 text-lg shadow-lg shadow-primary/20" disabled={loading}>
                  {loading ? "Adding..." : "Add to Library"}
                </Button>
              </CardFooter>
            </Card>

            <Link href="/allbooks" className="block">
              <Button variant="outline" type="button" className="w-full">
                Cancel and Go Back
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBookPage;