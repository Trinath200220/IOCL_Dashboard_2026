import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import styles from './Login.module.css';
import ioclLogo from '../../assets/iocl-logo.gif';
import barifloLogo from '../../assets/bariflo-logo.png';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Dynamically fetch from env
      const apiIp = import.meta.env.VITE_API_IP;
      const apiPort = import.meta.env.VITE_API_PORT;
      
      const response = await fetch(`http://${apiIp}:${apiPort}/users/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // We send username/email and password based on the form fields
        body: JSON.stringify({ email: username, password: password }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Save tokens and user data to local storage
        if (data.tokens) {
          localStorage.setItem('accessToken', data.tokens.access);
          localStorage.setItem('refreshToken', data.tokens.refresh);
        }
        if (data.data) {
          localStorage.setItem('userData', JSON.stringify(data.data));
        }
        // Navigate to dashboard on success
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
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
          <h1 className={styles.title}>Login</h1>
          <p className={styles.subtitle}>Industrial Wastewater Treatment Plant</p>
        </div>

        {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '10px', fontSize: '14px' }}>{error}</div>}

        {/* Form Section */}
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>USERNAME</label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} size={18} />
              <input
                type="text"
                placeholder="Enter your username"
                className={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

          <button type="submit" className={styles.loginButton} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className={styles.footer}>
          <Link to="/forgot-password" className={styles.forgotPassword}>
            Forget Password?
          </Link>
          <span className={styles.signUpText}>
            Don't have an account? <Link to="/signup" className={styles.signUpLink}>Sign Up</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
