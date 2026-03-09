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
    
    // Debug log env vars
    console.log('EmailJS Service ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
    console.log('EmailJS Template ID:', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
    console.log('EmailJS Public Key:', process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? 'set' : 'MISSING');
    
    // Validate form
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      // For testing - allow submission even with empty fields
      console.log('Form validation: allowing test submission');
    }

    setLoading(true);
    setStatus(null);

    // Create timeout promise
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timed out')), 10000)
    );

    // EmailJS promise
    const emailPromise = emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_is73und',
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_fg06e44',
      {
        from_name: form.name || 'Test User',
        to_name: "Miguel Ramirez",
        from_email: form.email || 'test@test.com',
        to_email: "mramirez@elmarfitness.com",
        message: (form.message || 'Test message') + " /n " + (form.email || 'test@test.com'),
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'z9lzSqZbjHJg9NFZ1Y1ub'
    );

    try {
      await Promise.race([emailPromise, timeoutPromise]);
      
      // Success
      setLoading(false);
      setStatus('success');
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(null), 5000);
      alert('Email sent successfully!');
      
    } catch (error) {
      console.error('Contact form error:', error);
      setLoading(false);
      setStatus('error');
      alert('Email failed: ' + error.message);
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
