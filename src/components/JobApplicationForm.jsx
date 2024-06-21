// JobApplicationForm.js
import React, { useState } from 'react'; // Import CSS file for styling

function JobApplicationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    interviewTime: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    let updatedSkills = formData.additionalSkills;
    if (checked) {
      updatedSkills.push(value);
    } else {
      updatedSkills = updatedSkills.filter(skill => skill !== value);
    }
    setFormData({
      ...formData,
      [name]: updatedSkills
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(formErrors);
    }
  };

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
    }
    if (!formData.position.trim()) {
      errors.position = 'Position is required';
    }
    if ((formData.position === "Developer" || formData.position === "Designer") && !formData.relevantExperience.trim()) {
      errors.relevantExperience = 'Relevant Experience is required';
    }
    if (formData.position === "Designer") {
      if (!formData.portfolioURL.trim()) {
        errors.portfolioURL = 'Portfolio URL is required';
      } else if (!isValidUrl(formData.portfolioURL)) {
        errors.portfolioURL = 'Portfolio URL is not valid';
      }
    }
    if (formData.position === "Manager" && !formData.managementExperience.trim()) {
      errors.managementExperience = 'Management Experience is required';
    }
    if (formData.additionalSkills.length === 0) {
      errors.additionalSkills = 'At least one skill is required';
    }
    if (!formData.interviewTime.trim()) {
      errors.interviewTime = 'Preferred Interview Time is required';
    }
    return errors;
  };

  const isValidUrl = (url) => {
    // Simple URL validation regex
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
    return urlPattern.test(url);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full Name:</label>
        <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
        {errors.fullName && <span className="error">{errors.fullName}</span>}

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}

        <label htmlFor="position">Applying for Position:</label>
        <select id="position" name="position" value={formData.position} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
        {errors.position && <span className="error">{errors.position}</span>}

        {formData.position && (
          <>
            {(formData.position === "Developer" || formData.position === "Designer") && (
              <div>
                <label htmlFor="relevantExperience">Relevant Experience (Years):</label>
                <input type="number" id="relevantExperience" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} />
                {errors.relevantExperience && <span className="error">{errors.relevantExperience}</span>}
              </div>
            )}
            {formData.position === "Designer" && (
              <div>
                <label htmlFor="portfolioURL">Portfolio URL:</label>
                <input type="text" id="portfolioURL" name="portfolioURL" value={formData.portfolioURL} onChange={handleChange} />
                {errors.portfolioURL && <span className="error">{errors.portfolioURL}</span>}
              </div>
            )}
            {formData.position === "Manager" && (
              <div>
                <label htmlFor="managementExperience">Management Experience:</label>
                <input type="text" id="managementExperience" name="managementExperience" value={formData.managementExperience} onChange={handleChange} />
                {errors.managementExperience && <span className="error">{errors.managementExperience}</span>}
              </div>
            )}
          </>
        )}

        <label>Additional Skills:</label>
        <div className='skills1'>
          <input type="checkbox" id="javascript" name="additionalSkills" value="JavaScript" checked={formData.additionalSkills.includes("JavaScript")} onChange={handleCheckboxChange} />
          <label htmlFor="javascript">JavaScript</label>
        </div>
        <div className='skills1'>
          <input type="checkbox" id="css" name="additionalSkills" value="CSS" checked={formData.additionalSkills.includes("CSS")} onChange={handleCheckboxChange} />
          <label htmlFor="css">CSS</label>
        </div>
        <div className='skills1'>
          <input type="checkbox" id="python" name="additionalSkills" value="Python" checked={formData.additionalSkills.includes("Python")} onChange={handleCheckboxChange} />
          <label htmlFor="python">Python</label>
        </div>
        {errors.additionalSkills && <span className="error">{errors.additionalSkills}</span>}

        <label htmlFor="interviewTime">Preferred Interview Time:</label>
        <input type="datetime-local" id="interviewTime" name="interviewTime" value={formData.interviewTime} onChange={handleChange} />
        {errors.interviewTime && <span className="error">{errors.interviewTime}</span>}

        <br></br><button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default JobApplicationForm;
