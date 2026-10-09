import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './Forgotpassword.module.css';

const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSendOTP = (e) => {
    e.preventDefault();
    // Logic to send OTP
    console.log('Send OTP to', email);
  };

  return (
    <div className={styles.container}>
      {/* Top App Bar */}
      <div className={styles.topBar}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowLeft size={24} color="#ffffff" />
        </button>
        <span className={styles.topBarTitle}>forgot-password</span>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        <div className={styles.card}>
          <h1 className={styles.title}>Forgot Password</h1>
          <p className={styles.subtitle}>Enter your registered email to receive OTP</p>

          <form onSubmit={handleSendOTP} className={styles.form}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.submitBtn}>
              Send OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;
