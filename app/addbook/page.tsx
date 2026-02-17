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
  ArrowLeft,
  Image as ImageIcon,
  Upload,
  X
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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["totalCopies", "availableCopies", "issuedCount"].includes(name) ? Number(value) : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please select a JPG, JPEG, or PNG image');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create FormData for multipart/form-data submission
      const formDataToSend = new FormData();

      // Append all form fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('isbn', formData.isbn);
      formDataToSend.append('totalCopies', formData.totalCopies.toString());
      formDataToSend.append('availableCopies', formData.availableCopies.toString());
      formDataToSend.append('issuedCount', formData.issuedCount.toString());

      // Append image file if selected
      if (selectedFile) {
        formDataToSend.append('coverImage', selectedFile);
      }

      const response = await fetch(`${API_BASE_URL}/books`, {
        method: 'POST',
        headers: {
          // Don't set Content-Type - browser will set it automatically with boundary
        },
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Book successfully added to the library!');

        // Reset form
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
        setSelectedFile(null);
        setImagePreview(null);

        setTimeout(() => {
          router.push('/allbooks');
        }, 2000);
      } else {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || 'Failed to add book. Please check your data.';
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Error adding book:', error);
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" /> Book Cover
                </CardTitle>
                <CardDescription>Upload a cover image for the book (optional).</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      id="coverImage"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="coverImage" className="cursor-pointer flex flex-col items-center gap-2">
                      <Upload className="h-10 w-10 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Click to upload cover image</p>
                        <p className="text-xs text-muted-foreground mt-1">JPG, JPEG or PNG (max 5MB)</p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Book cover preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

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