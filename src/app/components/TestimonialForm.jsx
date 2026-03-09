'use client'
import { useState } from 'react';
import { Box, Button, CircularProgress, Alert } from '@mui/material';
import emailjs from "@emailjs/browser";
import './styles/ContactForm.css';
import './styles/TestimonialForm.css';

const TestimonialForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    testimonial: "",
    rating: "5",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setStatus(null);

    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timed out')), 10000)
    );

    const emailPromise = emailjs.send(
      'service_is73und',
      'template_fg06e44',
      {
        from_name: form.name,
        to_name: "Miguel - TESTIMONIAL SUBMISSION",
        from_email: form.email || 'client@test.com',
        to_email: "mramirez@elmarfitness.com",
        message: `NEW TESTIMONIAL SUBMISSION\n\nName: ${form.name}\nEmail: ${form.email}\nRating: ${form.rating}/5 stars\n\nTestimonial:\n${form.testimonial}\n\n---\nReview this and add to website if approved!`,
      },
      'ty1KsE0WLO3qwvsZy'
    );

    try {
      await Promise.race([emailPromise, timeoutPromise]);
      
      setLoading(false);
      setStatus('success');
      setForm({ name: "", email: "", testimonial: "", rating: "5" });
      alert('Thank you! Your testimonial has been submitted. It will be reviewed and added if approved.');
      
    } catch (error) {
      console.error('Testimonial form error:', error);
      setLoading(false);
      setStatus('error');
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <Box className="contact-form-container">
      <div className='contact-form-title'>
        <p className=''>Share Your Experience</p>
      </div>
      
      {status === 'success' && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Thank you! Your testimonial has been submitted.
        </Alert>
      )}
      {status === 'error' && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Something went wrong. Please try again.
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email (optional)"
          value={form.email}
          onChange={handleChange}
        />
        
        <div className="rating-container">
          <label className="rating-label">Rating:</label>
          <select 
            name="rating" 
            value={form.rating} 
            onChange={handleChange}
            className="rating-select"
          >
            <option value="5">⭐⭐⭐⭐⭐ (5 stars)</option>
            <option value="4">⭐⭐⭐⭐ (4 stars)</option>
            <option value="3">⭐⭐⭐ (3 stars)</option>
            <option value="2">⭐⭐ (2 stars)</option>
            <option value="1">⭐ (1 star)</option>
          </select>
        </div>
        
        <textarea
          name="testimonial"
          placeholder="Share your experience with El Mar Fitness..."
          value={form.testimonial}
          onChange={handleChange}
          rows={5}
        />
        <p className="testimonial-note">
          Your testimonial will be reviewed before being posted to the website.
        </p>
        <Button
          type="submit"
          variant="contained"
          className="contact-button"
          color="primary"
          fullWidth
          disabled={loading}
          endIcon={loading && <CircularProgress size={24} color="inherit" />}
        >
          {loading ? 'Submitting...' : 'Submit Testimonial'}
        </Button>
      </form>
    </Box>
  );
};

export default TestimonialForm;
