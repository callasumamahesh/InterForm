// FormSummary.js
import React from 'react';

function FormSummary({ data }) {
  return (
    <div className="summary-container">
      <h2>Summary</h2>
      <ul>
        {Object.entries(data).map(([key, value]) => {
          // Exclude null or empty values
          if (value === null || value === '') {
            return null;
          }
          return (
            <li key={key}>
              <strong>{key}:</strong> {typeof value === 'object' ? value.join(', ') : value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FormSummary;
