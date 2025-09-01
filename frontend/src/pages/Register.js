import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', mobileNumber: '', password: '', confirmPassword: '',
    country: '', city: '', state: '', gender: ''
  });
  const [errors, setErrors] = useState({});
  const { register, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number must be 10 digits';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      const { confirmPassword, ...registerData } = formData;
      const result = await register(registerData);
      if (result) {
        navigate('/login');
      }
    } catch (err) {
      // Error handled by context
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card register-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join us to manage your tasks</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              disabled={loading}
            />
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              disabled={loading}
            />
          </div>
          
          <div className="form-row">
            <Input
              label="Mobile Number"
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              error={errors.mobileNumber}
              placeholder="10 digit number"
              maxLength="10"
              disabled={loading}
            />
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`form-control ${errors.gender ? 'error' : ''}`}
                disabled={loading}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <div className="error-message">{errors.gender}</div>}
            </div>
          </div>
          
          <div className="form-row-3">
            <Input
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              error={errors.country}
              disabled={loading}
            />
            <Input
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              error={errors.state}
              disabled={loading}
            />
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
              disabled={loading}
            />
          </div>
          
          <div className="form-row">
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              disabled={loading}
            />
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              disabled={loading}
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="auth-submit-btn"
          >
            Create Account
          </Button>
        </form>
        
        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">Sign in here</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Register;