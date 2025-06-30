import React from 'react';
import './TopBar.css';

const TopBar = ({ activeTab, onTabChange, onRegisterClick, onUploadClick }) => {
  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'search', label: 'Search' },
    { id: 'library', label: 'Your Library' }
  ];

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="navigation-buttons">
          <button className="nav-btn back-btn" disabled>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="nav-btn forward-btn" disabled>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="tab-navigation">
          {navigationItems.map(item => (
            <button
              key={item.id}
              className={`tab-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => onTabChange(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="topbar-right">
        <button 
          className="action-btn upload-btn"
          onClick={onUploadClick}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 12V4M8 4L5 7M8 4L11 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Upload
        </button>
        
        <button 
          className="action-btn register-btn"
          onClick={onRegisterClick}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="currentColor"/>
            <path d="M8 10C3.58172 10 0 13.5817 0 18H16C16 13.5817 12.4183 10 8 10Z" fill="currentColor"/>
          </svg>
          Sign Up
        </button>

        <div className="user-menu">
          <button className="user-btn">
            <div className="user-avatar">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="currentColor"/>
                <path d="M8 10C3.58172 10 0 13.5817 0 18H16C16 13.5817 12.4183 10 8 10Z" fill="currentColor"/>
              </svg>
            </div>
            <span>Profile</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
