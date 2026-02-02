"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL, Book, ApiResponse } from "@/lib/api";

export default function AllBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-yellow-50 p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6 text-center text-gray-800">
        All Books
      </h1>
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading books...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md max-w-2xl mx-auto shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  <span className="font-bold">Error:</span> {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 text-sm font-medium text-red-700 hover:text-red-600 underline"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
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
                  <tbody className="divide-y divide-gray-100">
                    {books.length > 0 ? (
                      books.map((book: Book, index: number) => (
                        <tr
                          key={book._id || index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 lg:px-6 py-3 lg:py-4 text-center font-semibold text-gray-700 text-sm lg:text-base">
                            {index + 1}
                          </td>
                          <td className="px-4 lg:px-6 py-3 lg:py-4 font-medium text-gray-900 text-sm lg:text-base">
                            {book.title}
                          </td>
                          <td className="px-4 lg:px-6 py-3 lg:py-4 text-gray-700 text-sm lg:text-base">
                            {book.author}
                          </td>
                          <td className="px-4 lg:px-6 py-3 lg:py-4 text-gray-600">
                            <span className="inline-block bg-orange-100 text-orange-700 px-2.5 py-1 rounded text-xs font-medium border border-orange-200">
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
                              className={`inline-block px-2 py-1 rounded-full text-xs lg:text-sm font-semibold ${book.availableCopies > 0
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
                          className="px-6 py-16 text-center text-gray-500"
                        >
                          <div className="flex flex-col items-center">
                            <svg
                              className="w-16 h-16 mb-4 text-gray-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                              />
                            </svg>
                            <p className="text-xl font-medium text-gray-700">No books found</p>
                            <p className="mt-1 text-gray-500">Your library collection is currently empty.</p>
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
                books.map((book: Book, index: number) => (
                  <div
                    key={book._id || index}
                    className="bg-white rounded-xl shadow-md p-5 space-y-4 border border-gray-100"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-teal-600 text-white rounded-full text-xs font-bold shadow-sm">
                            {index + 1}
                          </span>
                          <h3 className="text-base font-bold text-gray-900 leading-tight">
                            {book.title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 ml-8 font-medium">{book.author}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm ml-8">
                      <div>
                        <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                          Category
                        </span>
                        <span className="inline-block bg-orange-50 text-orange-700 px-2 py-0.5 rounded text-xs font-semibold border border-orange-100">
                          {book.category}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                          ISBN
                        </span>
                        <span className="text-gray-700 font-mono text-xs font-medium">
                          {book.isbn}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-50 ml-8">
                      <div className="flex items-center gap-6">
                        <div>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                            Total
                          </span>
                          <span className="inline-block bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
                            {book.totalCopies}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                            Available
                          </span>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${book.availableCopies > 0
                                ? "bg-green-50 text-green-800 border-green-100"
                                : "bg-red-50 text-red-800 border-red-100"
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
                <div className="bg-white rounded-xl shadow-md p-10 text-center border border-gray-100">
                  <svg
                    className="w-20 h-20 mx-auto mb-4 text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <p className="text-xl font-bold text-gray-800 mb-2">
                    No books found
                  </p>
                  <p className="text-sm text-gray-500">
                    Get started by adding some books to your library.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
