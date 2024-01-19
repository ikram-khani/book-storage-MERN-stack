// SearchBook.js

import React, { useState } from 'react';
import api from '../utils/api';

const SearchBook = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [editBook, setEditBook] = useState({
    id: '',
    title: '',
    author: '',
    publishYear: '',
  });

  const handleInputChange = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await api.get(`/books/${searchTitle}`);
      console.log('Search result:', response.data);

      // Update the search results
      setSearchResults(response.data);
    } catch (error) {
      console.error('Failed to search for books', error);
    }
  };

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

      // Fetch the updated search results
      const updatedResults = await api.get(`/books/${searchTitle}`);
      setSearchResults(updatedResults.data);

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

        // Fetch the updated search results
        const updatedResults = await api.get(`/books/${searchTitle}`);
        setSearchResults(updatedResults.data);
      } catch (error) {
        console.error('Failed to delete book', error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Search Book by Title</h2>
      <form onSubmit={handleSearch} className="mb-4">
        
        <div className="flex">
          <input
            type="text"
            name="searchTitle"
            value={searchTitle}
            onChange={handleInputChange}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
          >
            Search
          </button>
        </div>
      </form>

      {searchResults.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Search Results</h3>
          <ul>
            {searchResults.map((book) => (
              <li key={book._id} className="mb-2 p-2 border border-gray-300 rounded-md">
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
                      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setEditBook({ id: '', title: '', author: '', publishYear: '' })}
                      className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex">
                    <button
                      onClick={() => handleEdit(book)}
                      className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBook;
