import React, { useState, useEffect } from 'react';
import './Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({
    songs: [],
    artists: [],
    albums: [],
    playlists: []
  });
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  const mockData = {
    songs: [
      { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', image: '/api/placeholder/50/50' },
      { id: 2, title: 'Watermelon Sugar', artist: 'Harry Styles', album: 'Fine Line', duration: '2:54', image: '/api/placeholder/50/50' },
      { id: 3, title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:23', image: '/api/placeholder/50/50' },
      { id: 4, title: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'SOUR', duration: '2:58', image: '/api/placeholder/50/50' },
      { id: 5, title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', album: 'F*CK LOVE 3', duration: '2:21', image: '/api/placeholder/50/50' }
    ],
    artists: [
      { id: 1, name: 'The Weeknd', followers: '85M', image: '/api/placeholder/100/100' },
      { id: 2, name: 'Harry Styles', followers: '45M', image: '/api/placeholder/100/100' },
      { id: 3, name: 'Dua Lipa', followers: '67M', image: '/api/placeholder/100/100' }
    ],
    albums: [
      { id: 1, title: 'After Hours', artist: 'The Weeknd', year: '2020', image: '/api/placeholder/150/150' },
      { id: 2, title: 'Fine Line', artist: 'Harry Styles', year: '2019', image: '/api/placeholder/150/150' },
      { id: 3, title: 'Future Nostalgia', artist: 'Dua Lipa', year: '2020', image: '/api/placeholder/150/150' }
    ]
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const filteredResults = {
          songs: mockData.songs.filter(song => 
            song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            song.artist.toLowerCase().includes(searchTerm.toLowerCase())
          ),
          artists: mockData.artists.filter(artist => 
            artist.name.toLowerCase().includes(searchTerm.toLowerCase())
          ),
          albums: mockData.albums.filter(album => 
            album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            album.artist.toLowerCase().includes(searchTerm.toLowerCase())
          )
        };
        setSearchResults(filteredResults);
        setIsLoading(false);
      }, 500);
    } else {
      setSearchResults({ songs: [], artists: [], albums: [], playlists: [] });
    }
  }, [searchTerm]);

  const handlePlay = (song) => {
    console.log('Playing:', song.title);
    // Implement play functionality
  };

  const formatDuration = (duration) => {
    return duration;
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <div className="search-input-container">
          <svg className="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {searchTerm && (
        <div className="search-results">
          <div className="search-tabs">
            <button 
              className={`tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button 
              className={`tab ${activeTab === 'songs' ? 'active' : ''}`}
              onClick={() => setActiveTab('songs')}
            >
              Songs
            </button>
            <button 
              className={`tab ${activeTab === 'artists' ? 'active' : ''}`}
              onClick={() => setActiveTab('artists')}
            >
              Artists
            </button>
            <button 
              className={`tab ${activeTab === 'albums' ? 'active' : ''}`}
              onClick={() => setActiveTab('albums')}
            >
              Albums
            </button>
          </div>

          {isLoading ? (
            <div className="loading">Searching...</div>
          ) : (
            <div className="results-content">
              {(activeTab === 'all' || activeTab === 'songs') && searchResults.songs.length > 0 && (
                <div className="results-section">
                  <h3>Songs</h3>
                  <div className="songs-list">
                    {searchResults.songs.map((song) => (
                      <div key={song.id} className="song-item">
                        <img src={song.image} alt={song.title} className="song-image" />
                        <div className="song-info">
                          <div className="song-title">{song.title}</div>
                          <div className="song-artist">{song.artist}</div>
                        </div>
                        <div className="song-album">{song.album}</div>
                        <div className="song-duration">{song.duration}</div>
                        <button 
                          className="play-button"
                          onClick={() => handlePlay(song)}
                        >
                          ▶
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(activeTab === 'all' || activeTab === 'artists') && searchResults.artists.length > 0 && (
                <div className="results-section">
                  <h3>Artists</h3>
                  <div className="artists-grid">
                    {searchResults.artists.map((artist) => (
                      <div key={artist.id} className="artist-card">
                        <img src={artist.image} alt={artist.name} className="artist-image" />
                        <div className="artist-name">{artist.name}</div>
                        <div className="artist-followers">{artist.followers} followers</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(activeTab === 'all' || activeTab === 'albums') && searchResults.albums.length > 0 && (
                <div className="results-section">
                  <h3>Albums</h3>
                  <div className="albums-grid">
                    {searchResults.albums.map((album) => (
                      <div key={album.id} className="album-card">
                        <img src={album.image} alt={album.title} className="album-image" />
                        <div className="album-title">{album.title}</div>
                        <div className="album-artist">{album.artist} • {album.year}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
