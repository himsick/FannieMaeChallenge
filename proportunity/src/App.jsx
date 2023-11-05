// Setup
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Form from './components/Form';
import Testimonial from './components/Testimonial';
import Hero from './components/Hero';
import TabsFAQ from './components/TabsFAQ';
//import Chatbot from './components/Chatbot';
//import Footer from './components/Footer';

// App Function
function App () {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

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