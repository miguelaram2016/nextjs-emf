'use client';

import ContactForm from '../components/ContactForm';
import '../components/styles/ContactForm.css';

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Get In <span className="text-blue-400">Touch</span>
          </h1>
          <p className="text-xl text-gray-300">
            Have questions? I'd love to hear from you.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-800 rounded-xl p-8">
          <ContactForm />
        </div>

        {/* Contact Info */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-2">Email</h3>
            <p className="text-gray-300">mramirez@elmarfitness.com</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-2">Location</h3>
            <p className="text-gray-300">Austin, TX</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
