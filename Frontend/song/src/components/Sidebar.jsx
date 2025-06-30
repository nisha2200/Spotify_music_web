import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ activeTab, onTabChange }) => {
  const [playlists, setPlaylists] = useState([
    { id: 1, name: 'Liked Songs', count: 234, type: 'liked' },
    { id: 2, name: 'My Playlist #1', count: 45, type: 'playlist' },
    { id: 3, name: 'Chill Vibes', count: 67, type: 'playlist' },
    { id: 4, name: 'Workout Mix', count: 89, type: 'playlist' },
    { id: 5, name: 'Road Trip', count: 123, type: 'playlist' },
    { id: 6, name: 'Study Music', count: 56, type: 'playlist' },
    { id: 7, name: 'Party Hits', count: 78, type: 'playlist' },
    { id: 8, name: 'Throwback', count: 91, type: 'playlist' }
  ]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const mainNavItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'search', label: 'Search', icon: 'search' },
    { id: 'library', label: 'Your Library', icon: 'library' }
  ];

  const libraryItems = [
    { id: 'recently-played', label: 'Recently Played', icon: 'clock' },
    { id: 'liked-songs', label: 'Liked Songs', icon: 'heart' },
    { id: 'albums', label: 'Albums', icon: 'album' },
    { id: 'artists', label: 'Artists', icon: 'artist' },
    { id: 'podcasts', label: 'Podcasts', icon: 'podcast' }
  ];

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      const newPlaylist = {
        id: Date.now(),
        name: newPlaylistName.trim(),
        count: 0,
        type: 'playlist'
      };
      setPlaylists(prev => [...prev, newPlaylist]);
      setNewPlaylistName('');
      setShowCreatePlaylist(false);
    }
  };

  const getIcon = (iconType) => {
    const icons = {
      home: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      search: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      library: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      clock: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      heart: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61V4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      album: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      artist: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      podcast: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 8C13.5913 8 15.1174 8.63214 16.2426 9.75736C17.3679 10.8826 18 12.4087 18 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8C10.4087 8 8.88258 8.63214 7.75736 9.75736C6.63214 10.8826 6 12.4087 6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 14V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      playlist: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M21 15V6M21 6L18 9M21 6L24 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 18C5.10457 18 6 17.1046 6 16C6 14.8954 5.10457 14 4 14C2.89543 14 2 14.8954 2 16C2 17.1046 2.89543 18 4 18Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M6 16V4H20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      liked: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61V4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor"/>
        </svg>
      )
    };
    return icons[iconType] || icons.playlist;
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="#1DB954"/>
          <path d="M22.5 13.8C18.8 11.6 12.2 11.3 8.8 12.8C8.3 13 8.1 13.6 8.3 14.1C8.5 14.6 9.1 14.8 9.6 14.6C12.5 13.3 18.3 13.6 21.5 15.5C22 15.8 22.6 15.6 22.9 15.1C23.2 14.6 23 14 22.5 13.8Z" fill="white"/>
          <path d="M22.3 17.8C22 18.2 21.5 18.3 21.1 18C18 16.2 13.2 15.7 10.3 16.8C9.8 17 9.3 16.7 9.1 16.2C8.9 15.7 9.2 15.2 9.7 15C13.2 13.7 18.6 14.3 22.2 16.4C22.6 16.7 22.7 17.3 22.3 17.8Z" fill="white"/>
          <path d="M21 21.5C20.8 21.8 20.4 21.9 20.1 21.7C17.4 20.2 14 19.8 10.5 20.7C10.1 20.8 9.7 20.5 9.6 20.1C9.5 19.7 9.8 19.3 10.2 19.2C14.1 18.2 17.9 18.7 21 20.4C21.3 20.6 21.4 21 21 21.5Z" fill="white"/>
        </svg>
        {!isCollapsed && <span className="logo-text">Spotify</span>}
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {mainNavItems.map(item => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => onTabChange(item.id)}
              >
                {getIcon(item.icon)}
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Library Section */}
      {!isCollapsed && (
        <div className="sidebar-section">
          <div className="section-header">
            <h3>Your Library</h3>
            <button 
              className="create-playlist-btn"
              onClick={() => setShowCreatePlaylist(true)}
            >
              +
            </button>
          </div>
          
          <ul className="library-list">
            {libraryItems.map(item => (
              <li key={item.id} className="library-item">
                <button
                  className={`library-link ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => onTabChange(item.id)}
                >
                  {getIcon(item.icon)}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Playlists */}
      {!isCollapsed && (
        <div className="sidebar-section playlists-section">
          <div className="playlists-container">
            {playlists.map(playlist => (
              <div key={playlist.id} className="playlist-item">
                <button
                  className={`playlist-link ${activeTab === `playlist-${playlist.id}` ? 'active' : ''}`}
                  onClick={() => onTabChange(`playlist-${playlist.id}`)}
                >
                  <div className="playlist-icon">
                    {playlist.type === 'liked' ? getIcon('liked') : getIcon('playlist')}
                  </div>
                  <div className="playlist-info">
                    <div className="playlist-name">{playlist.name}</div>
                    <div className="playlist-count">{playlist.count} songs</div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Playlist Modal */}
      {showCreatePlaylist && (
        <div className="create-playlist-modal">
          <div className="modal-content">
            <h3>Create Playlist</h3>
            <input
              type="text"
              placeholder="Playlist name"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreatePlaylist()}
              autoFocus
            />
            <div className="modal-actions">
              <button onClick={() => setShowCreatePlaylist(false)}>Cancel</button>
              <button onClick={handleCreatePlaylist}>Create</button>
            </div>
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <button 
        className="collapse-btn"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Install App Prompt */}
      {!isCollapsed && (
        <div className="install-app">
          <div className="install-content">
            <h4>Install App</h4>
            <p>Install this app on your device for a better experience</p>
            <button className="install-btn">Install</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
