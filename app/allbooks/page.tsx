"use client"

import { useState, useEffect } from 'react';

export default function AllBooks() {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:7000/api/books")
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="min-h-screen bg-yellow-50 p-8">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">All Books</h1>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th className="px-6 py-4 text-center font-semibold">S.No</th>
                <th className="px-6 py-4 text-left font-semibold">Title</th>
                <th className="px-6 py-4 text-left font-semibold">Author</th>
                <th className="px-6 py-4 text-left font-semibold">Category</th>
                <th className="px-6 py-4 text-left font-semibold">ISBN</th>
                <th className="px-6 py-4 text-center font-semibold">Total Copies</th>
                <th className="px-6 py-4 text-center font-semibold">Available</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book: any, index: number) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-center font-semibold text-gray-700">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{book.title}</td>
                    <td className="px-6 py-4 text-gray-700">{book.author}</td>
                    <td className="px-6 py-4 text-gray-600">
                      <span className="inline-block bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                        {book.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-mono text-sm">{book.isbn}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">
                        {book.totalCopies}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${
                        book.availableCopies > 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {book.availableCopies}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <p className="text-lg font-medium">No books found</p>
                      <p className="text-sm">Add some books to get started!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
