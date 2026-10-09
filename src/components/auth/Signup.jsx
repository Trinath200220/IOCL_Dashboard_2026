import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import styles from './Signup.module.css';
import ioclLogo from '../../assets/iocl-logo.gif';
import barifloLogo from '../../assets/bariflo-logo.png';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    setIsLoading(true);

    try {
      const apiIp = import.meta.env.VITE_API_IP;
      const apiPort = import.meta.env.VITE_API_PORT;
      
      const response = await fetch(`http://${apiIp}:${apiPort}/users/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          phone, 
          password, 
          confirm_password: confirmPassword 
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        if (data.tokens) {
          localStorage.setItem('accessToken', data.tokens.access);
          localStorage.setItem('refreshToken', data.tokens.refresh);
        }
        if (data.data) {
          localStorage.setItem('userData', JSON.stringify(data.data));
        }
        navigate('/dashboard');
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An error occurred connecting to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        {/* Logo Section */}
        <div className={styles.logoBox}>
          <img src={ioclLogo} alt="IndianOil" className={styles.ioclLogo} />
          <div className={styles.divider}></div>
          <img src={barifloLogo} alt="Bariflo Cybernetics" className={styles.barifloLogo} />
        </div>

        {/* Header Section */}
        <div className={styles.headerSection}>
          <div className={styles.badge}>IOCL WWTP HMI</div>
          <h1 className={styles.title}>Sign Up</h1>
          <p className={styles.subtitle}>Industrial Wastewater Treatment Plant</p>
        </div>

        {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '10px', fontSize: '14px' }}>{error}</div>}

        {/* Form Section */}
        <form onSubmit={handleSignup} className={styles.form}>
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>EMAIL</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={18} />
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>PHONE NUMBER</label>
            <div className={styles.inputWrapper}>
              <Phone className={styles.inputIcon} size={18} />
              <input
                type="tel"
                placeholder="Enter your phone number"
                className={styles.input}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>PASSWORD</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>CONFIRM PASSWORD</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={18} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                className={styles.input}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.loginButton} disabled={isLoading}>
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div className={styles.footer}>
          <span className={styles.signUpText} style={{width: '100%', textAlign: 'center'}}>
            Already have an account? <Link to="/" className={styles.signUpLink}>Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
