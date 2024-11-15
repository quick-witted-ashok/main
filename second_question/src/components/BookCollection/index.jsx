import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookCollection= () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', genre: '', description: '' });
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch books based on the search query
  useEffect(() => {
    // Make the API call when the search query changes
    axios.get(`http://localhost:5000/search-books?query=${searchQuery}`)
      .then(response => {
        setBooks(response.data);  // Update books state with the filtered books
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, [searchQuery]);  // Dependency array ensures it runs when searchQuery changes

  // Handle input changes for adding a new book
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for adding a new book
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/add-book', newBook)
      .then(response => {
        console.log(response.data.message);
        setNewBook({ title: '', author: '', genre: '', description: '' });  // Reset form
      })
      .catch(error => {
        console.error('Error adding book:', error);
      });
  };

  return (
    <div>
      <h1>Book Collection</h1>

      {/* Form to add a new book */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newBook.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="author"
          value={newBook.author}
          onChange={handleInputChange}
          placeholder="Author"
          required
        />
        <input
          type="text"
          name="genre"
          value={newBook.genre}
          onChange={handleInputChange}
          placeholder="Genre"
          required
        />
        <textarea
          name="description"
          value={newBook.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        ></textarea>
        <button type="submit">Add Book</button>
      </form>

      {/* Search bar to filter books */}
      <input
        type="text"
        placeholder="Search by title or author"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <h2>Books List</h2>
      <ul>
        {books.length > 0 ? (
          books.map((book, index) => (
            <li key={index}>
              <strong>{book.title}</strong> by {book.author} - Genre: {book.genre}
              <p>{book.description}</p>
            </li>
          ))
        ) : (
          <p>No books found</p>
        )}
      </ul>
    </div>
  );
};

export default BookCollection;
