/*
File Name: App.jsx
*/

// Setup
import React, { useState, useEffect } from 'react';
//import Chatbot from './compnents/Chatbot';
//import Footer from './compnents/Footer';
import Form from './components/Form';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Suggestions from './components/Suggestions';
import TabsFAQ from './components/TabsFAQ';
import Testimonial from './components/Testimonial';
import { ScrollProvider } from './components/Scroll';

function App() {
  const [eligibility, setEligibility] = useState(null);
  const [isComplete, setComplete] = useState(false);

  // ... Other state variables and functions ...

  // Function to handle form submission
  const handleFormSubmit = (formData) => {
    // Send the form data to the Flask server for assessment
    fetch("http://127.0.0.1:5173/assess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      setEligibility(data); // Save the eligibility data in state
      setComplete(true); // Indicate that the process is complete
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return(
    <ScrollProvider>
    <div>
      <Navbar />
      <Hero />
      <Form onFormSubmit={handleFormSubmit} />
      <Suggestions />
      <Testimonial />
      <TabsFAQ />
      {isComplete && eligibility && (
        <div className="eligibility-results">
          <h2>Loan Eligibility Results:</h2>
          <p>Credit Score Check: {eligibility.CreditScoreCheck}</p>
          <p>LTV Status: {eligibility.LTV_Status}</p>
          <p>DTI Status: {eligibility.DTI_Status}</p>
          <p>FEDTI Status: {eligibility.FEDTI_Status}</p>
        </div>
      )}
    </div>
    </ScrollProvider>
  );
}

export default App;
