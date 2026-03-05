"use client"
import { useState } from 'react';
import { Box, Button, CircularProgress, Alert } from '@mui/material';
import emailjs from "@emailjs/browser";
import './styles/ContactForm.css'; // Import CSS file


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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    
    emailjs
      .send(
        process.env.NEXT_EMAILJS_SERVICE_ID,
        process.env.NEXT_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Miguel Ramirez",
          from_email: form.email,
          to_email: "mramirez@elmarfitness.com",
          message: form.message + " /n " + form.email,
        },
        process.env.NEXT_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          setStatus('success');

          setForm({
            name: "",
            email: "",
            message: "",
          });
          
          // Clear success message after 5 seconds
          setTimeout(() => setStatus(null), 5000);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          setStatus('error');
          
          // Clear error message after 5 seconds
          setTimeout(() => setStatus(null), 5000);
        }
      );
  };

  return (
    <Box className="contact-form-container">
      <div className='contact-form-title'>
        <p className=''>Let`s connect!</p>
      </div>
      
      {status === 'success' && (
        // eslint-disable-next-line react/no-unescaped-entities
        <Alert severity="success" sx={{ mb: 2 }}>
          Thanks! I'll get back to you soon.
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
          placeholder="Name"
          onChange={handleChange}

        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}

        />
        <textarea
          type="text"
          name="message"
          placeholder="Message"
          onChange={handleChange}

        />
        <Button
          type="submit"
          variant="contained"
          className="contact-button"
          color="primary"
          fullWidth
          disabled={loading}
          endIcon={loading && <CircularProgress size={24} />}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Box>
    
  );
};

export default ContactForm;
