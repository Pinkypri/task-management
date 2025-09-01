import React from 'react';

const Input = ({ 
  label, 
  error, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <input 
        className={`form-control ${error ? 'error' : ''} ${className}`}
        {...props}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Input;