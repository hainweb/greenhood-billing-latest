'use client';

import React from 'react';

export default function OfflinePage() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      textAlign: 'center',
      padding: '2rem',
      backgroundColor: '#f8f9fa',
      color: '#343a40'
    }}>
      <h1 style={{ fontSize: '3rem', color: '#2e7d32' }}>Offline</h1>
      <p style={{ fontSize: '1.25rem', marginTop: '1rem' }}>
        It looks like you're currently offline.
      </p>
      <p style={{ marginTop: '0.5rem', color: '#6c757d' }}>
        Don't worry! Green Hood is designed to work offline. 
        You can still manage your laundry tags once the main application is loaded.
      </p>
      <button 
        onClick={() => window.location.reload()}
        style={{
          marginTop: '2rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: 'bold',
          color: '#fff',
          backgroundColor: '#2e7d32',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
      >
        Try Again
      </button>
    </div>
  );
}
