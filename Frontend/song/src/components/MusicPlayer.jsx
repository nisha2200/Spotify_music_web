import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

const MusicPlayer = ({ currentSong, playlist = [], isVisible = true }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // off, one, all
  const [showQueue, setShowQueue] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  // Mock current song if none provided
  const song = currentSong || {
    id: 1,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    image: '/api/placeholder/60/60',
    duration: 200, // 3:20 in seconds
    url: '/api/placeholder/audio.mp3'
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleNext);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleNext);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    console.log('Previous song');
    // Implement previous song logic
  };

  const handleNext = () => {
    console.log('Next song');
    // Implement next song logic
  };

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    const progressBar = progressRef.current;
    const clickX = e.nativeEvent.offsetX;
    const width = progressBar.offsetWidth;
    const newTime = (clickX / width) * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleRepeat = () => {
    const modes = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  if (!isVisible) return null;

  return (
    <div className="music-player">
      <audio ref={audioRef} src={song.url} />
      
      {/* Song Info */}
      <div className="player-song-info">
        <img src={song.image} alt={song.title} className="player-song-image" />
        <div className="player-song-details">
          <div className="player-song-title">{song.title}</div>
          <div className="player-song-artist">{song.artist}</div>
        </div>
        <button className="like-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 14.25L7.125 13.4375C3.5 10.1875 1 7.9375 1 5.25C1 3.25 2.5625 1.6875 4.5625 1.6875C5.6875 1.6875 6.75 2.25 7.25 3.0625H8.75C9.25 2.25 10.3125 1.6875 11.4375 1.6875C13.4375 1.6875 15 3.25 15 5.25C15 7.9375 12.5 10.1875 8.875 13.4375L8 14.25Z" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
      </div>

      {/* Player Controls */}
      <div className="player-controls">
        <div className="player-buttons">
          <button 
            className={`control-btn ${isShuffled ? 'active' : ''}`}
            onClick={toggleShuffle}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 2.5L15.5 5L13 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 5H15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 8.5L15.5 11L13 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 11H15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button className="control-btn" onClick={handlePrevious}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3.3 1L3.3 15M12.7 1L3.3 8L12.7 15V1Z" fill="currentColor"/>
            </svg>
          </button>
          
          <button className="play-btn" onClick={togglePlay}>
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="3" y="2" width="3" height="12" fill="currentColor"/>
                <rect x="10" y="2" width="3" height="12" fill="currentColor"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 2L13 8L3 14V2Z" fill="currentColor"/>
              </svg>
            )}
          </button>
          
          <button className="control-btn" onClick={handleNext}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12.7 1V15M3.3 1L12.7 8L3.3 15V1Z" fill="currentColor"/>
            </svg>
          </button>
          
          <button 
            className={`control-btn ${repeatMode !== 'off' ? 'active' : ''}`}
            onClick={toggleRepeat}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 4.5L3 2.5L5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 2.5V9.5C3 10.6 3.9 11.5 5 11.5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 11.5L13 13.5L11 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 13.5V6.5C13 5.4 12.1 4.5 11 4.5H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {repeatMode === 'one' && <span className="repeat-indicator">1</span>}
          </button>
        </div>
        
        <div className="progress-container">
          <span className="time-display">{formatTime(currentTime)}</span>
          <div 
            className="progress-bar" 
            ref={progressRef}
            onClick={handleProgressClick}
          >
            <div 
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
            <div 
              className="progress-handle"
              style={{ left: `${progressPercentage}%` }}
            />
          </div>
          <span className="time-display">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume and Queue Controls */}
      <div className="player-extras">
        <button 
          className="control-btn"
          onClick={() => setShowQueue(!showQueue)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M15 7H1V9H15V7Z" fill="currentColor"/>
            <path d="M15 3H1V5H15V3Z" fill="currentColor"/>
            <path d="M15 11H1V13H15V11Z" fill="currentColor"/>
          </svg>
        </button>
        
        <button className="control-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M1 3V13L6 8L1 3Z" fill="currentColor"/>
            <path d="M8 3V13L13 8L8 3Z" fill="currentColor"/>
            <rect x="14" y="3" width="1" height="10" fill="currentColor"/>
          </svg>
        </button>
        
        <div className="volume-container">
          <button className="control-btn" onClick={toggleMute}>
            {isMuted || volume === 0 ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11 5L13 7M13 5L11 7M8 3L4 6H1V10H4L8 13V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : volume < 0.5 ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3L4 6H1V10H4L8 13V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.5 6.5C11.2 7.2 11.2 8.8 10.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3L4 6H1V10H4L8 13V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.5 6.5C11.2 7.2 11.2 8.8 10.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.5 4.5C14.2 6.2 14.2 9.8 12.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
        
        <button className="control-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M6 1V3M10 1V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Queue Panel */}
      {showQueue && (
        <div className="queue-panel">
          <div className="queue-header">
            <h3>Queue</h3>
            <button onClick={() => setShowQueue(false)}>×</button>
          </div>
          <div className="queue-content">
            <div className="now-playing">
              <h4>Now Playing</h4>
              <div className="queue-item active">
                <img src={song.image} alt={song.title} />
                <div className="queue-item-info">
                  <div className="queue-item-title">{song.title}</div>
                  <div className="queue-item-artist">{song.artist}</div>
                </div>
              </div>
            </div>
            <div className="next-up">
              <h4>Next Up</h4>
              {/* Queue items would go here */}
              <p className="empty-queue">No songs in queue</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
