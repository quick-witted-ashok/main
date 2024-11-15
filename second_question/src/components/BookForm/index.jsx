import React, { useState } from 'react';
import axios from 'axios';

const BookForm = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    description: '',
  });
  const [message, setMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/books', bookData);
      setMessage(response.data.message);
      setBookData({ title: '', author: '', description: '' }); // Reset form fields
    } catch (error) {
      setMessage('Failed to add book');
    }
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={bookData.description}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default BookForm;
