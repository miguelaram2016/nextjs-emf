"use client"
import { useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import emailjs from "@emailjs/browser";
import './styles/ContactForm.css'; // Import CSS file


const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);


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

    
    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Miguel Ramirez",
          from_email: form.email,
          to_email: "mramirez@elmarfitness.com",
          message: form.message + " /n " + form.email,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <Box className="contact-form-container">
      <div className='contact-form-title'>
        <p className=''>Let`s connect!</p>
      </div>
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
