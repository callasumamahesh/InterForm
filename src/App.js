// App.js
import React, { useState } from 'react';
import './App.css'; // Import CSS file for styling
import FormSummary from './components/FormSummary';
import JobApplicationForm from './components/JobApplicationForm';

function App() {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className="App">
      <h1>Job Application Form</h1>
      {formData ? (
        <FormSummary data={formData} />
      ) : (
        <JobApplicationForm onSubmit={handleFormSubmit} />
      )}
    </div>
  );
}

export default App;
