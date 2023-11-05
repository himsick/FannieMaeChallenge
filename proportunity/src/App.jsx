/*
File Name: App.jsx
*/

// Setup
import React, { useState } from 'react';
//import Chatbot from './compnents/Chatbot';
//import Footer from './compnents/Footer';
import Form from './components/Form';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import TabsFAQ from './components/TabsFAQ';
import Testimonial from './components/Testimonial';
import { ScrollProvider } from './components/Scroll';

// App Implementation
const App = () =>
{
  return(
    <ScrollProvider>
    <div>
      <Navbar />
      <Hero />
      <Form />
      <Testimonial />
      <TabsFAQ />
    </div>
    </ScrollProvider>
  );
};

// Final Export of App
export default App;