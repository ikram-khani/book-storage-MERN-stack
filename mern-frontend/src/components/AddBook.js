// AddBook.js

import React, { useState } from 'react';
import api from '../utils/api';

const AddBook = ({ onBookAdded }) => {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    publishYear: '',
  });

  const [showDialog, setShowDialog] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/books', newBook);
      console.log('Book added successfully:', response.data);

      // Show dialog message
      setShowDialog(true);

      // Notify the parent component that a new book has been added
      onBookAdded();

      // Clear the form fields
      setNewBook({
        title: '',
        author: '',
        publishYear: '',
      });

      // Hide the dialog after 3 seconds
      setTimeout(() => {
        setShowDialog(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to add book', error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
      <form onSubmit={handleAddBook}>
        {/* Dialog Message */}
        {showDialog && (
          <div className="bg-green-200 text-green-800 p-2 mb-4 rounded-md">
            Book added successfully!
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">Title:</label>
          <input
            type="text"
            name="title"
            value={newBook.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">Author:</label>
          <input
            type="text"
            name="author"
            value={newBook.author}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">Publish Year:</label>
          <input
            type="text"
            name="publishYear"
            value={newBook.publishYear}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
