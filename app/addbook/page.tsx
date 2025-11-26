"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBook() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    isbn: '',
    totalCopies: '',
    availableCopies: '',
    issuesCount: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  }

  const handleSubmit = async (e: any)=>{
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:7000/api/books', {
        method : "POST",
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(formData)
      })
      if(response.ok){
        alert("Book added successfully");
        setFormData({
          title : '',
          author : '',
          description : '',
          category : '',
          isbn : '',
          totalCopies : '',
          availableCopies : '',
          issuesCount : '',
        });
        router.push('/allbooks');
      }else{
        alert("Failed to add book");
      }
      
    }catch(error){
      console.log("Error:", error);
      alert("An error occurred while adding the book");
    }
  }

  return (
      <div className="min-h-screen bg-yellow-50 flex items-center justify-center p-4">
      
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-amber-900 mb-6">Add New Book</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-amber-700 mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-amber-300 rounded-md p-2 bg-transparent text-gray-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-semibold text-amber-700 mb-2">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="mt-1 block w-full border border-amber-300 rounded-md p-2 bg-transparent text-gray-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-amber-700 mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-amber-300 rounded-md p-2 bg-transparent text-gray-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200 resize-none"
              rows={3}
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-amber-700 mb-2">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-amber-300 rounded-md p-2 bg-transparent text-gray-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div>
            <label htmlFor="isbn" className="block text-sm font-semibold text-amber-700 mb-2">ISBN</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className="mt-1 block w-full border border-amber-300 rounded-md p-2 bg-transparent text-gray-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="totalCopies" className="block text-sm font-semibold text-amber-700 mb-2">Total Copies</label>
              <input
                type="number"
                id="totalCopies"
                name="totalCopies"
                value={formData.totalCopies}
                onChange={handleChange}
                className="mt-1 block w-full border border-amber-300 rounded-md p-2 bg-transparent text-gray-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                min="0"
              />
            </div>
            <div>
              <label htmlFor="availableCopies" className="block text-sm font-semibold text-amber-700 mb-2">Available Copies</label>
              <input
                type="number"
                id="availableCopies"
                name="availableCopies"
                value={formData.availableCopies}
                onChange={handleChange}
                className="mt-1 block w-full border border-amber-300 rounded-md p-2 bg-transparent text-gray-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                min="0"
              />
            </div>
            <div>
              <label htmlFor="issuesCount" className="block text-sm font-semibold text-amber-700 mb-2">Issues Count</label>
              <input
                type="number"
                id="issuesCount"
                name="issuesCount"
                value={formData.issuesCount}
                onChange={handleChange}
                className="mt-1 block w-full border border-amber-300 rounded-md p-2 bg-transparent text-gray-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                min="0"
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-amber-600 text-white px-4 py-3 rounded-md hover:bg-amber-700 transition duration-200 font-semibold shadow-md">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}
