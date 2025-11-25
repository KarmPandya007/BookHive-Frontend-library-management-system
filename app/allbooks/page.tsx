"use client"

import { useState, useEffect } from 'react';

const allbooks = () => {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:7000/api/books/")
      .then(res => res.json())
      .then(data => {
        console.log("Raw API data:", data);
        console.log("Data type:", typeof data);
        console.log("Is array?", Array.isArray(data));
        
        if (Array.isArray(data)) {
          console.log("Setting books array, length:", data.length);
          setBooks(data);
        } else if (data && Array.isArray(data.books)) {
          console.log("Setting books from data.books, length:", data.books.length);
          setBooks(data.books);
        } else {
          console.log("No valid array found in response");
          setBooks([]);
        }
      })
      .catch(error => {
        console.log("Fetch error:", error);
        setBooks([]);
      });
  }, []);

  console.log("Current books state:", books);
  console.log("Books length:", books.length);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">All Books</h1>
      <p>Books in state: {books.length}</p>
      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <div className="space-y-4">
          {books.map((book, index) => (
            <div key={index} className="border p-4 rounded bg-white">
              <h3 className="text-xl font-bold">{book.title || 'No title'}</h3>
              <p>Author: {book.author || 'No author'}</p>
              <p>Category: {book.category || 'No category'}</p>
              <p>ISBN: {book.isbn || 'No ISBN'}</p>
              <p>Total Copies: {book.totalCopies || 0}</p>
              <p>Available: {book.availableCopies || 0}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default allbooks