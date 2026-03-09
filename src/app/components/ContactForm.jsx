"use client"
import { useState } from 'react';
import { Box, Button, CircularProgress, Alert } from '@mui/material';
import emailjs from "@emailjs/browser";
import './styles/ContactForm.css';

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

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
    
    // Validate form
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
      return;
    }

    setLoading(true);
    setStatus(null);

    // Create timeout promise
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timed out')), 10000)
    );

    // EmailJS promise
    const emailPromise = emailjs.send(
      process.env.VITE_APP_EMAILJS_SERVICE_ID || process.env.NEXT_EMAILJS_SERVICE_ID,
      process.env.VITE_APP_EMAILJS_TEMPLATE_ID || process.env.NEXT_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: "Miguel Ramirez",
        from_email: form.email,
        to_email: "mramirez@elmarfitness.com",
        message: form.message + " /n " + form.email,
      },
      process.env.VITE_APP_EMAILJS_PUBLIC_KEY || process.env.NEXT_EMAILJS_PUBLIC_KEY
    );

    try {
      await Promise.race([emailPromise, timeoutPromise]);
      
      // Success
      setLoading(false);
      setStatus('success');
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(null), 5000);
      
    } catch (error) {
      console.error('Contact form error:', error);
      setLoading(false);
      setStatus('error');
      setTimeout(() => setStatus(null), 10000);
    }
  };

  const handleRetry = () => {
    setStatus(null);
  };

  return (
    <Box className="contact-form-container">
      <div className='contact-form-title'>
        <p className=''>Let's connect!</p>
      </div>
      
      {status === 'success' && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Thanks! I'll get back to you soon.
        </Alert>
      )}
      {status === 'error' && (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          action={
            <Button color="inherit" size="small" onClick={handleRetry}>
              Try Again
            </Button>
          }
        >
          Something went wrong. Please check your connection and try again.
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <Button
          type="submit"
          variant="contained"
          className="contact-button"
          color="primary"
          fullWidth
          disabled={loading}
          endIcon={loading && <CircularProgress size={24} color="inherit" />}
        >
          {loading ? 'Sending...' : 'Submit'}
        </Button>
      </form>
    </Box>
  );
};

export default ContactForm;
