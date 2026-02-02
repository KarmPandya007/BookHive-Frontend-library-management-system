"use client";

import { useState, useEffect } from "react";

export default function AllBooks() {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://book-hive-backend-library-managemen.vercel.app/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data.allBooks || []))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="min-h-screen bg-yellow-50 p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6 text-center text-gray-800">
        All Books
      </h1>
      <div className="max-w-7xl mx-auto">
        {/* Desktop Table View */}
        <div className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-teal-600 text-white">
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-center font-semibold text-sm lg:text-base">
                    S.No
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left font-semibold text-sm lg:text-base">
                    Title
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left font-semibold text-sm lg:text-base">
                    Author
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left font-semibold text-sm lg:text-base">
                    Category
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left font-semibold text-sm lg:text-base">
                    ISBN
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-center font-semibold text-sm lg:text-base">
                    Total
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-center font-semibold text-sm lg:text-base">
                    Available
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.length > 0 ? (
                  books.map((book: any, index: number) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-center font-semibold text-gray-700 text-sm lg:text-base">
                        {index + 1}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 font-medium text-gray-800 text-sm lg:text-base">
                        {book.title}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-gray-700 text-sm lg:text-base">
                        {book.author}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-gray-600">
                        <span className="inline-block bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                          {book.category}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-gray-600 font-mono text-xs lg:text-sm">
                        {book.isbn}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-center">
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs lg:text-sm font-semibold">
                          {book.totalCopies}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-center">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs lg:text-sm font-semibold ${
                            book.availableCopies > 0
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {book.availableCopies}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <svg
                          className="w-12 h-12 mb-4 text-gray-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
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

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {books.length > 0 ? (
            books.map((book: any, index: number) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-teal-600 text-white rounded-full text-xs font-bold">
                        {index + 1}
                      </span>
                      <h3 className="text-base font-semibold text-gray-800">
                        {book.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-8">{book.author}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500 font-medium block mb-1">
                      Category
                    </span>
                    <span className="inline-block bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                      {book.category}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium block mb-1">
                      ISBN
                    </span>
                    <span className="text-gray-700 font-mono text-xs">
                      {book.isbn}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-xs text-gray-500 block mb-1">
                        Total
                      </span>
                      <span className="inline-block bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full text-sm font-semibold">
                        {book.totalCopies}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block mb-1">
                        Available
                      </span>
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-sm font-semibold ${
                          book.availableCopies > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {book.availableCopies}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <p className="text-lg font-medium text-gray-700 mb-1">
                No books found
              </p>
              <p className="text-sm text-gray-500">
                Add some books to get started!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}