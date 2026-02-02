"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL, Book, ApiResponse } from "@/lib/api";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Edit,
  Trash2,
  Search,
  MoreVertical,
  BookOpen,
  Layers,
  Hash,
  RefreshCcw,
  Plus
} from "lucide-react";
import Link from "next/link";

export default function AllBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/books`);
      if (!res.ok) {
        throw new Error("Failed to fetch books");
      }
      const data: ApiResponse = await res.json();
      if (data.success) {
        setBooks(data.allBooks || []);
      } else {
        throw new Error("API responded with failure");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Book deleted successfully!");
        setBooks((prev) => prev.filter((book) => book._id !== id));
      } else {
        toast.error("Failed to delete book.");
      }
    } catch (err) {
      toast.error("Error deleting book.");
      console.error(err);
    }
  };

  const handleEditClick = (book: Book) => {
    setEditingBook({ ...book });
    setIsModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook) return;

    try {
      const res = await fetch(`${API_BASE_URL}/books/${editingBook._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingBook),
      });

      if (res.ok) {
        toast.success("Book updated successfully!");
        setIsModalOpen(false);
        setBooks((prev) => prev.map((b) => (b._id === editingBook._id ? editingBook : b)));
      } else {
        toast.error("Failed to update book.");
      }
    } catch (err) {
      toast.error("Error updating book.");
      console.error(err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingBook) return;
    const { name, value } = e.target;
    setEditingBook({
      ...editingBook,
      [name]: ["totalCopies", "availableCopies", "issuedCount"].includes(name) ? Number(value) : value,
    });
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4 sm:px-8 max-w-7xl space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Library Collection</h1>
          <p className="text-muted-foreground">Manage and view all books in your library inventory.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search books..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" onClick={() => fetchBooks()} title="Refresh">
            <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button asChild>
            <Link href="/addbook">
              <Plus className="h-4 w-4 mr-2" />
              Add Book
            </Link>
          </Button>
        </div>
      </div>

      {loading && books.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden border-dashed">
              <CardHeader className="space-y-2">
                <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
                <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-20 bg-muted animate-pulse rounded" />
                <div className="flex justify-between">
                  <div className="h-4 w-1/4 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-1/4 bg-muted animate-pulse rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="p-3 bg-destructive/10 rounded-full">
              <Trash2 className="h-6 w-6 text-destructive" />
            </div>
            <div className="text-center">
              <CardTitle className="text-destructive">Connection Error</CardTitle>
              <CardDescription>{error}</CardDescription>
            </div>
            <Button variant="outline" onClick={() => fetchBooks()}>Try Again</Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">S.No</TableHead>
                    <TableHead>Book Details</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>ISBN</TableHead>
                    <TableHead className="text-center">Inventory</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBooks.length > 0 ? (
                    filteredBooks.map((book: Book, index: number) => (
                      <TableRow key={book._id}>
                        <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-semibold text-foreground line-clamp-1">{book.title}</span>
                            <span className="text-xs text-muted-foreground">{book.author}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-normal">
                            {book.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-xs">{book.isbn}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex gap-2">
                              <div className="flex flex-col items-center">
                                <span className="text-[10px] uppercase font-bold text-muted-foreground">Total</span>
                                <span className="text-sm font-semibold">{book.totalCopies}</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <span className="text-[10px] uppercase font-bold text-muted-foreground">Avail</span>
                                <Badge variant={book.availableCopies > 0 ? "secondary" : "destructive"} className="h-5 px-1.5 min-w-[24px] justify-center">
                                  {book.availableCopies}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleEditClick(book)} title="Edit">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(book._id)} title="Delete">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <Search className="h-10 w-10 mb-2 opacity-20" />
                          <p>No books matching your search.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book: Book, index: number) => (
                <Card key={book._id} className="overflow-hidden">
                  <CardHeader className="pb-3 border-b bg-muted/30">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="h-5 w-5 p-0 justify-center rounded-full text-[10px]">{index + 1}</Badge>
                          <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{book.category}</Badge>
                        </div>
                        <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
                        <CardDescription className="font-medium text-foreground/80">{book.author}</CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditClick(book)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(book._id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                          <Hash className="h-3 w-3" /> ISBN
                        </span>
                        <p className="text-sm font-mono">{book.isbn}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                          <Layers className="h-3 w-3" /> Stock
                        </span>
                        <div className="flex gap-2">
                          <div className="text-center bg-secondary/50 px-2 py-0.5 rounded text-xs font-semibold">
                            {book.totalCopies} Total
                          </div>
                          <Badge variant={book.availableCopies > 0 ? "secondary" : "destructive"}>
                            {book.availableCopies} Left
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
              )) : (
              <Card className="border-dashed">
                <CardContent className="py-12 flex flex-col items-center justify-center text-muted-foreground">
                  <Search className="h-10 w-10 mb-2 opacity-20" />
                  <p>No books found.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}

      {/* Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" /> Edit Book Details
            </DialogTitle>
            <DialogDescription>
              Modify the book information and inventory counts.
            </DialogDescription>
          </DialogHeader>
          {editingBook && (
            <form onSubmit={handleUpdate} className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title" className="text-xs uppercase font-bold">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={editingBook.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="author" className="text-xs uppercase font-bold">Author</Label>
                  <Input
                    id="author"
                    name="author"
                    value={editingBook.author}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description" className="text-xs uppercase font-bold">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editingBook.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category" className="text-xs uppercase font-bold">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={editingBook.category}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="isbn" className="text-xs uppercase font-bold">ISBN</Label>
                  <Input
                    id="isbn"
                    name="isbn"
                    value={editingBook.isbn}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="totalCopies" className="text-[10px] uppercase font-bold">Total Copies</Label>
                  <Input
                    id="totalCopies"
                    type="number"
                    name="totalCopies"
                    value={editingBook.totalCopies}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="availableCopies" className="text-[10px] uppercase font-bold">Available</Label>
                  <Input
                    id="availableCopies"
                    type="number"
                    name="availableCopies"
                    value={editingBook.availableCopies}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="issuedCount" className="text-[10px] uppercase font-bold">Issued</Label>
                  <Input
                    id="issuedCount"
                    type="number"
                    name="issuedCount"
                    value={editingBook.issuedCount}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
              </div>
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
