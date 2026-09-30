import React from 'react';

const PlaceholderPage = ({ title }) => {
  return (
    <div style={{
      padding: '40px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
    }}>
      <h2 style={{ fontSize: '24px', color: '#0f172a', marginBottom: '16px' }}>{title}</h2>
      <p style={{ color: '#64748b' }}>
        This page is currently under construction. Future updates will include detailed {title.toLowerCase()} metrics and controls.
      </p>
    </div>
  );
};

export default PlaceholderPage;
