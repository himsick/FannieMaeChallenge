// Setup
import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Form from './components/Form';
import Testimonial from './components/Testimonial';
import Hero from './components/Hero';
import TabsFAQ from './components/TabsFAQ';
//import Chatbot from './components/Chatbot';
//import Footer from './components/Footer';

// App Function
const App = () =>
{
  return(
    <div>
      <Navbar />
      <Hero />
      <Form />
      <Testimonial />
      <TabsFAQ />
    </div>
  );
};

// Final Export of App
export default App;