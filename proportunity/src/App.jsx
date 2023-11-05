// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Form from './components/Form';
import Testimonial from './components/Testimonial';
import Hero from './components/Hero';
import TabsFAQ from './components/TabsFAQ';

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

  return (
    <div>
      <Navbar />
      <Hero />
      <Form onFormSubmit={handleFormSubmit} />
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
  );
}

export default App;
