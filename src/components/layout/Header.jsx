import React, { useState, useEffect } from 'react';
import { Menu, Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ toggleSidebar }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const handleLogout = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      
      const response = await fetch(`${apiUrl}/users/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {})
        },
        body: JSON.stringify({ refresh: refreshToken })
      });
      
      const data = await response.json().catch(() => ({}));
      console.log('Logout API Response:', data);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
      navigate('/');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <Menu className={styles.menuIcon} size={24} onClick={toggleSidebar} />
        <h1 className={styles.title}>INDIAN OIL - WATER OPERATIONS DASHBOARD</h1>
        <div className={styles.statusBadge}>System Running</div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.timeContainer}>
          <span className={styles.time}>{formatTime(currentTime)}</span>
          <span className={styles.date}>{formatDate(currentTime)}</span>
        </div>
        
        <div className={styles.iconButton}>
          <Bell size={20} />
          <span className={styles.badge}>3</span>
        </div>

        <div className={styles.userProfile} onClick={() => setShowDropdown(!showDropdown)}>
          <div className={styles.avatar}>AD</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Admin</span>
            <span className={styles.userRole}>Administrator</span>
          </div>
          
          {showDropdown && (
            <div className={styles.dropdown}>
              <button className={styles.logoutButton} onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
