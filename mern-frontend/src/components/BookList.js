// src/components/BookList.js

import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState({
    id: '',
    title: '',
    author: '',
    publishYear: '',
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        console.log('Response from API:', response.data);
  
        // Access the 'data' property to get the 'books' array
        setBooks(response.data.data);
      } catch (error) {
        console.error('Failed to fetch books', error);
      }
    };
  
    fetchBooks();
  }, []);

  const handleEdit = (book) => {
    setEditBook({
      id: book._id,
      title: book.title,
      author: book.author,
      publishYear: book.publishYear,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await api.put(`/books/${editBook.id}`, editBook);
      console.log(response.data);

      // Fetch the updated book list
      const updatedBooks = await api.get('/books');
      setBooks(updatedBooks.data.data);

      // Clear the editBook state
      setEditBook({
        id: '',
        title: '',
        author: '',
        publishYear: '',
      });
    } catch (error) {
      console.error('Failed to update book', error);
    }
  };

  const handleDelete = async (bookId) => {
    // Show confirmation alert
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');

    if (confirmDelete) {
      try {
        const response = await api.delete(`/books/${bookId}`);
        console.log(response.data);

        // Fetch the updated book list
        const updatedBooks = await api.get('/books');
        setBooks(updatedBooks.data.data);
      } catch (error) {
        console.error('Failed to delete book', error);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id} className="mb-4 p-4 border border-gray-300 rounded-md">
            <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-2">Author: {book.author}</p>
            <p className="text-gray-600 mb-2">Publish Year: {book.publishYear}</p>

            {/* Edit Form */}
            {editBook.id === book._id ? (
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  value={editBook.title}
                  onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
                  className="mb-2 p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Author"
                  value={editBook.author}
                  onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
                  className="mb-2 p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Publish Year"
                  value={editBook.publishYear}
                  onChange={(e) => setEditBook({ ...editBook, publishYear: e.target.value })}
                  className="mb-2 p-2 border border-gray-300 rounded-md"
                />
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white p-2 rounded-md mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditBook({ id: '', title: '', author: '', publishYear: '' })}
                  className="bg-gray-500 text-white p-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleEdit(book)}
                className="bg-green-500 text-white p-2 rounded-md mr-2"
              >
                Edit
              </button>
            )}

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(book._id)}
              className="bg-red-500 text-white p-2 rounded-md"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
