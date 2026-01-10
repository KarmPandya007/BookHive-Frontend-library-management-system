"use client";

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'totalCopies' || name === 'availableCopies' || name === 'issuedCount' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://book-hive-backend-library-managemen.vercel.app//api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Book added successfully!');
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
        }, 3000); // 2-second delay
      } else {
        toast.error('Failed to add book.');
      }
    } catch (error) {
      toast.error('An error occurred while adding the book.');
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 flex items-center justify-center px-4 py-6 sm:py-8">
        <div className="w-full max-w-md lg:max-w-2xl">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-orange-500 mb-2">Add New Book</h1>
            <p className="text-sm sm:text-base text-gray-600">Fill in the details to add a book to your library</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div>
                <label htmlFor="title" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Book Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter book title"
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-sm sm:text-base text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 transition duration-200 hover:border-gray-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="author" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Author Name
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Enter author name"
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-sm sm:text-base text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 transition duration-200 hover:border-gray-300"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of the book"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-sm sm:text-base text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 transition duration-200 resize-none hover:border-gray-300"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div>
                <label htmlFor="category" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Fiction, Science"
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-sm sm:text-base text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 transition duration-200 hover:border-gray-300"
                />
              </div>
              <div>
                <label htmlFor="isbn" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  ISBN
                </label>
                <input
                  type="text"
                  id="isbn"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  placeholder="978-0-123456-78-9"
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-sm sm:text-base text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 transition duration-200 hover:border-gray-300"
                />
              </div>
            </div>
            <div className="bg-gradient-to-r from-teal-50 to-orange-50 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Inventory Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="totalCopies" className="block text-xs font-semibold text-gray-600 mb-1.5">Total Copies</label>
                  <input
                    type="number"
                    id="totalCopies"
                    name="totalCopies"
                    value={formData.totalCopies}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full border-2 border-white bg-white rounded-lg px-3 py-2 text-sm sm:text-base text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 transition duration-200 hover:border-gray-200"
                    min="0"
                  />
                </div>
                <div>
                  <label htmlFor="availableCopies" className="block text-xs font-semibold text-gray-600 mb-1.5">Available</label>
                  <input
                    type="number"
                    id="availableCopies"
                    name="availableCopies"
                    value={formData.availableCopies}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full border-2 border-white bg-white rounded-lg px-3 py-2 text-sm sm:text-base text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 transition duration-200 hover:border-gray-200"
                    min="0"
                  />
                </div>
                <div>
                  <label htmlFor="issuedCount" className="block text-xs font-semibold text-gray-600 mb-1.5">Issued</label>
                  <input
                    type="number"
                    id="issuedCount"
                    name="issuedCount"
                    value={formData.issuedCount}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full border-2 border-white bg-white rounded-lg px-3 py-2 text-sm sm:text-base text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 transition duration-200 hover:border-gray-200"
                    min="0"
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-teal-600 to-orange-500 text-white py-3 sm:py-3.5 rounded-lg hover:from-teal-700 hover:to-orange-600 transition-all duration-300 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Book to Library
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBookPage;