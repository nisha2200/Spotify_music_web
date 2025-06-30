import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    dateOfBirth: {
      day: '',
      month: '',
      year: ''
    },
    gender: '',
    marketingEmails: false,
    shareData: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('dateOfBirth')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        dateOfBirth: {
          ...prev.dateOfBirth,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.displayName) {
      newErrors.displayName = 'Display name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.dateOfBirth.day || !formData.dateOfBirth.month || !formData.dateOfBirth.year) {
      newErrors.dateOfBirth = 'Please enter your complete date of birth';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Registration data:', formData);
      alert('Registration successful! Welcome to Spotify!');
      
      // Reset form
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        displayName: '',
        dateOfBirth: { day: '', month: '', year: '' },
        gender: '',
        marketingEmails: false,
        shareData: false
      });
      setStep(1);
      
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    console.log('Google sign up clicked');
    // Implement Google OAuth
  };

  const handleFacebookSignUp = () => {
    console.log('Facebook sign up clicked');
    // Implement Facebook OAuth
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <div className="spotify-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#1DB954"/>
            <path d="M22.5 13.8C18.8 11.6 12.2 11.3 8.8 12.8C8.3 13 8.1 13.6 8.3 14.1C8.5 14.6 9.1 14.8 9.6 14.6C12.5 13.3 18.3 13.6 21.5 15.5C22 15.8 22.6 15.6 22.9 15.1C23.2 14.6 23 14 22.5 13.8Z" fill="white"/>
            <path d="M22.3 17.8C22 18.2 21.5 18.3 21.1 18C18 16.2 13.2 15.7 10.3 16.8C9.8 17 9.3 16.7 9.1 16.2C8.9 15.7 9.2 15.2 9.7 15C13.2 13.7 18.6 14.3 22.2 16.4C22.6 16.7 22.7 17.3 22.3 17.8Z" fill="white"/>
            <path d="M21 21.5C20.8 21.8 20.4 21.9 20.1 21.7C17.4 20.2 14 19.8 10.5 20.7C10.1 20.8 9.7 20.5 9.6 20.1C9.5 19.7 9.8 19.3 10.2 19.2C14.1 18.2 17.9 18.7 21 20.4C21.3 20.6 21.4 21 21 21.5Z" fill="white"/>
          </svg>
        </div>
        <h1>Sign up to start listening</h1>
      </div>

      <div className="register-form-container">
        {step === 1 ? (
          <form className="register-form">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password"
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Enter your password again"
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="displayName">What should we call you?</label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                placeholder="Enter a profile name"
                className={errors.displayName ? 'error' : ''}
              />
              {errors.displayName && <span className="error-message">{errors.displayName}</span>}
              <small>This appears on your profile.</small>
            </div>

            <button type="button" onClick={handleNext} className="next-btn">
              Next
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label>What's your date of birth?</label>
              <div className="date-inputs">
                <select
                  name="dateOfBirth.day"
                  value={formData.dateOfBirth.day}
                  onChange={handleInputChange}
                  className={errors.dateOfBirth ? 'error' : ''}
                >
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <select
                  name="dateOfBirth.month"
                  value={formData.dateOfBirth.month}
                  onChange={handleInputChange}
                  className={errors.dateOfBirth ? 'error' : ''}
                >
                  <option value="">Month</option>
                  {months.map((month, index) => (
                    <option key={month} value={index + 1}>{month}</option>
                  ))}
                </select>
                <select
                  name="dateOfBirth.year"
                  value={formData.dateOfBirth.year}
                  onChange={handleInputChange}
                  className={errors.dateOfBirth ? 'error' : ''}
                >
                  <option value="">Year</option>
                  {Array.from({ length: 100 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </select>
              </div>
              {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
            </div>

            <div className="form-group">
              <label>What's your gender?</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleInputChange}
                  />
                  Male
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleInputChange}
                  />
                  Female
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="non-binary"
                    checked={formData.gender === 'non-binary'}
                    onChange={handleInputChange}
                  />
                  Non-binary
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="prefer-not-to-say"
                    checked={formData.gender === 'prefer-not-to-say'}
                    onChange={handleInputChange}
                  />
                  Prefer not to say
                </label>
              </div>
              {errors.gender && <span className="error-message">{errors.gender}</span>}
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="marketingEmails"
                  checked={formData.marketingEmails}
                  onChange={handleInputChange}
                />
                I would prefer not to receive marketing messages from Spotify
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="shareData"
                  checked={formData.shareData}
                  onChange={handleInputChange}
                />
                Share my registration data with Spotify's content providers for marketing purposes
              </label>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setStep(1)} className="back-btn">
                Back
              </button>
              <button type="submit" disabled={isLoading} className="submit-btn">
                {isLoading ? 'Creating account...' : 'Sign up'}
              </button>
            </div>
          </form>
        )}

        <div className="divider">
          <span>or</span>
        </div>

        <div className="social-signup">
          <button onClick={handleGoogleSignUp} className="social-btn google-btn">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path fill="#4285F4" d="M19.99 10.187c0-.82-.069-1.417-.216-2.037H10.2v3.698h5.62c-.113.76-.583 1.95-1.671 2.74l-.015.126 2.427 1.88.168.017c1.544-1.426 2.435-3.52 2.435-6.002-.003-.294-.027-.586-.081-.872z"/>
              <path fill="#34A853" d="M10.2 19.931c2.217 0 4.064-.694 5.42-1.928L12.7 16.745c-.697.48-1.608.83-2.5.83-1.887 0-3.469-1.26-4.031-2.97L5.91 14.745l-.014.121 2.407 1.866.018.121c1.183 2.35 3.62 3.078 5.879 3.078z"/>
              <path fill="#FBBC05" d="M6.169 11.605c-.147-.48-.23-.99-.23-1.518s.083-1.038.23-1.518L6.169 8.448 3.762 6.582c-.5 1.005-.787 2.136-.787 3.431s.287 2.426.787 3.431l2.407-1.866z"/>
              <path fill="#EA4335" d="M10.2 4.378c1.338 0 2.23.58 2.74 1.06l2.007-1.96C13.263.615 11.416 0 10.2 0 7.941 0 5.504.728 4.321 3.078L6.728 4.944c.562-1.71 2.144-2.97 4.031-2.97z"/>
            </svg>
            Continue with Google
          </button>
          <button onClick={handleFacebookSignUp} className="social-btn facebook-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="#1877F2">
              <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"/>
            </svg>
            Continue with Facebook
          </button>
        </div>

        <div className="login-link">
          <p>Already have an account? <a href="/login">Log in here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
