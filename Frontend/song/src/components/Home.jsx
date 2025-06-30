import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [greeting, setGreeting] = useState('');
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [topMixes, setTopMixes] = useState([]);
  const [madeForYou, setMadeForYou] = useState([]);
  const [recentlyPlayedArtists, setRecentlyPlayedArtists] = useState([]);

  useEffect(() => {
    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    // Mock data
    setRecentlyPlayed([
      { id: 1, title: 'Liked Songs', type: 'playlist', image: '/api/placeholder/150/150' },
      { id: 2, title: 'Discover Weekly', type: 'playlist', image: '/api/placeholder/150/150' },
      { id: 3, title: 'Release Radar', type: 'playlist', image: '/api/placeholder/150/150' },
      { id: 4, title: 'Daily Mix 1', type: 'playlist', image: '/api/placeholder/150/150' },
      { id: 5, title: 'Chill Hits', type: 'playlist', image: '/api/placeholder/150/150' },
      { id: 6, title: 'Pop Rising', type: 'playlist', image: '/api/placeholder/150/150' }
    ]);

    setTopMixes([
      { id: 1, title: 'Daily Mix 1', description: 'The Weeknd, Dua Lipa, Harry Styles and more', image: '/api/placeholder/200/200' },
      { id: 2, title: 'Daily Mix 2', description: 'Billie Eilish, Olivia Rodrigo, Taylor Swift and more', image: '/api/placeholder/200/200' },
      { id: 3, title: 'Daily Mix 3', description: 'Ed Sheeran, Shawn Mendes, Charlie Puth and more', image: '/api/placeholder/200/200' },
      { id: 4, title: 'Daily Mix 4', description: 'Ariana Grande, Doja Cat, SZA and more', image: '/api/placeholder/200/200' },
      { id: 5, title: 'Daily Mix 5', description: 'Post Malone, Travis Scott, Drake and more', image: '/api/placeholder/200/200' }
    ]);

    setMadeForYou([
      { id: 1, title: 'Discover Weekly', description: 'Your weekly mixtape of fresh music', image: '/api/placeholder/200/200' },
      { id: 2, title: 'Release Radar', description: 'Catch all the latest music from artists you follow', image: '/api/placeholder/200/200' },
      { id: 3, title: 'On Repeat', description: 'The songs you can\'t stop playing', image: '/api/placeholder/200/200' },
      { id: 4, title: 'Repeat Rewind', description: 'Songs you loved and might want to hear again', image: '/api/placeholder/200/200' }
    ]);

    setRecentlyPlayedArtists([
      { id: 1, name: 'The Weeknd', image: '/api/placeholder/150/150' },
      { id: 2, name: 'Dua Lipa', image: '/api/placeholder/150/150' },
      { id: 3, name: 'Harry Styles', image: '/api/placeholder/150/150' },
      { id: 4, name: 'Billie Eilish', image: '/api/placeholder/150/150' },
      { id: 5, name: 'Taylor Swift', image: '/api/placeholder/150/150' }
    ]);
  }, []);

  const handlePlaylistClick = (playlist) => {
    console.log('Playing playlist:', playlist.title);
  };

  const handleArtistClick = (artist) => {
    console.log('Viewing artist:', artist.name);
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="greeting">{greeting}</h1>
        <div className="quick-actions">
          <button className="notification-btn">🔔</button>
          <button className="profile-btn">👤</button>
        </div>
      </div>

      {/* Recently Played Grid */}
      <section className="recently-played-section">
        <div className="recently-played-grid">
          {recentlyPlayed.map((item) => (
            <div 
              key={item.id} 
              className="recently-played-card"
              onClick={() => handlePlaylistClick(item)}
            >
              <img src={item.image} alt={item.title} className="recently-played-image" />
              <span className="recently-played-title">{item.title}</span>
              <button className="play-overlay">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Your top mixes */}
      <section className="section">
        <div className="section-header">
          <h2>Your top mixes</h2>
          <button className="show-all-btn">Show all</button>
        </div>
        <div className="cards-grid">
          {topMixes.map((mix) => (
            <div 
              key={mix.id} 
              className="card"
              onClick={() => handlePlaylistClick(mix)}
            >
              <div className="card-image-container">
                <img src={mix.image} alt={mix.title} className="card-image" />
                <button className="card-play-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
              <h3 className="card-title">{mix.title}</h3>
              <p className="card-description">{mix.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Made for you */}
      <section className="section">
        <div className="section-header">
          <h2>Made for you</h2>
          <button className="show-all-btn">Show all</button>
        </div>
        <div className="cards-grid">
          {madeForYou.map((playlist) => (
            <div 
              key={playlist.id} 
              className="card"
              onClick={() => handlePlaylistClick(playlist)}
            >
              <div className="card-image-container">
                <img src={playlist.image} alt={playlist.title} className="card-image" />
                <button className="card-play-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
              <h3 className="card-title">{playlist.title}</h3>
              <p className="card-description">{playlist.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recently played artists */}
      <section className="section">
        <div className="section-header">
          <h2>Recently played artists</h2>
          <button className="show-all-btn">Show all</button>
        </div>
        <div className="artists-grid">
          {recentlyPlayedArtists.map((artist) => (
            <div 
              key={artist.id} 
              className="artist-card"
              onClick={() => handleArtistClick(artist)}
            >
              <div className="artist-image-container">
                <img src={artist.image} alt={artist.name} className="artist-image" />
                <button className="artist-play-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
              <h3 className="artist-name">{artist.name}</h3>
              <p className="artist-type">Artist</p>
            </div>
          ))}
        </div>
      </section>

      {/* Jump back in */}
      <section className="section">
        <div className="section-header">
          <h2>Jump back in</h2>
          <button className="show-all-btn">Show all</button>
        </div>
        <div className="cards-grid">
          {recentlyPlayed.slice(0, 4).map((item) => (
            <div 
              key={`jump-${item.id}`} 
              className="card"
              onClick={() => handlePlaylistClick(item)}
            >
              <div className="card-image-container">
                <img src={item.image} alt={item.title} className="card-image" />
                <button className="card-play-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-description">Playlist</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
