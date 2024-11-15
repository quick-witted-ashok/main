import React, { useState, useEffect } from 'react';

const FeedbackForm=()=> {
  // State variables for form data, feedback list, and submission status
  const [formData, setFormData] = useState({ name: '', email: '', feedback: '' });
  const [feedbackList, setFeedbackList] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Load feedback from localStorage on component mount
  useEffect(() => {
    const storedFeedback = JSON.parse(localStorage.getItem('feedbackList'));
    if (storedFeedback) {
      setFeedbackList(storedFeedback);
    }
  }, []);

  // Update localStorage whenever feedbackList changes
  useEffect(() => {
    localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
  }, [feedbackList]);

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = { ...formData, id: Date.now() };
    setFeedbackList([...feedbackList, newFeedback]); // Update feedback list
    setFormData({ name: '', email: '', feedback: '' }); // Clear form
    setSubmitted(true); // Show success message

    // Hide success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div>
      <h2>Submit Your Feedback</h2>

      {/* Show success message after submission */}
      {submitted && <p style={{ color: 'green' }}>Thank you for your feedback!</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Feedback:</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {/* Display submitted feedback */}
      <h3>Feedback Submitted</h3>
      {feedbackList.length > 0 ? (
        <ul>
          {feedbackList.map((feedback) => (
            <li key={feedback.id}>
              <p><strong>Name:</strong> {feedback.name}</p>
              <p><strong>Email:</strong> {feedback.email}</p>
              <p><strong>Feedback:</strong> {feedback.feedback}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedback submitted yet.</p>
      )}
    </div>
  );
}

export default FeedbackForm;
