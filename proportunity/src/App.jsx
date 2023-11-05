/*
File Name: App.jsx
*/

// Setup
<<<<<<< HEAD
import React, { useState } from 'react';
//import Chatbot from './compnents/Chatbot';
//import Footer from './compnents/Footer';
=======
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
>>>>>>> 072ff552d068029fbac17ab79846d53c0c5c6bf1
import Form from './components/Form';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import TabsFAQ from './components/TabsFAQ';
import Testimonial from './components/Testimonial';
import { ScrollProvider } from './components/Scroll';

<<<<<<< HEAD
// App Implementation
const App = () =>
{
=======
// App Function
function App () {

  const [data, setData] = useState([{}])

  useEffect(() => {
    
    fetch("http://127.0.0.1:5173/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

>>>>>>> 072ff552d068029fbac17ab79846d53c0c5c6bf1
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