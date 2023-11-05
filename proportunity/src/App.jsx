// Setup
import React, { useState } from 'react';
import { Auth0Provider } from '@auth0/auth0-react'; // Import the Auth0Provider
//import AuthLogin from './components/AuthLogin';

// Component imports
import Form from './components/Form';
import Graph from './components/Graph';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Suggestions from './components/Suggestions';
import Chatbot from './components/Chatbot';
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
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN} 
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID} 
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <ScrollProvider>
        <div>
          <Navbar />
          <Hero />
          <Form onFormSubmit={handleFormSubmit} />
          <Graph />
          <Suggestions />
          <Testimonial />
          <Chatbot />
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
    </Auth0Provider>
  );
}

export default App;
