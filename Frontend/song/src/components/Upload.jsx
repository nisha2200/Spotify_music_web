import React, { useState, useRef } from 'react';
import './Upload.css';

const Upload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [currentStep, setCurrentStep] = useState('upload'); // upload, details, success
  const [selectedFile, setSelectedFile] = useState(null);
  const [songDetails, setSongDetails] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    year: '',
    description: '',
    isPublic: true,
    allowDownload: false,
    tags: []
  });
  const [newTag, setNewTag] = useState('');
  const fileInputRef = useRef(null);

  const acceptedFormats = ['.mp3', '.wav', '.flac', '.m4a', '.aac'];
  const maxFileSize = 100 * 1024 * 1024; // 100MB

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(file => {
      const isValidFormat = acceptedFormats.some(format => 
        file.name.toLowerCase().endsWith(format)
      );
      const isValidSize = file.size <= maxFileSize;
      
      if (!isValidFormat) {
        alert(`${file.name} is not a supported format. Please use: ${acceptedFormats.join(', ')}`);
        return false;
      }
      
      if (!isValidSize) {
        alert(`${file.name} is too large. Maximum file size is 100MB.`);
        return false;
      }
      
      return true;
    });

    validFiles.forEach(file => {
      const fileId = Date.now() + Math.random();
      const fileData = {
        id: fileId,
        file: file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading'
      };

      setUploadedFiles(prev => [...prev, fileData]);
      simulateUpload(fileId, file);
    });
  };

  const simulateUpload = (fileId, file) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadedFiles(prev => 
          prev.map(f => f.id === fileId ? { ...f, status: 'completed' } : f)
        );
      }
      setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
    }, 200);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  const proceedToDetails = (file) => {
    setSelectedFile(file);
    setCurrentStep('details');
    
    // Auto-fill some details from filename
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
    const parts = nameWithoutExt.split(' - ');
    if (parts.length >= 2) {
      setSongDetails(prev => ({
        ...prev,
        artist: parts[0].trim(),
        title: parts[1].trim()
      }));
    } else {
      setSongDetails(prev => ({
        ...prev,
        title: nameWithoutExt
      }));
    }
  };

  const handleDetailsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSongDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !songDetails.tags.includes(newTag.trim())) {
      setSongDetails(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setSongDetails(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Uploading song:', {
        file: selectedFile,
        details: songDetails
      });
      
      setCurrentStep('success');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    }
  };

  const resetUpload = () => {
    setCurrentStep('upload');
    setSelectedFile(null);
    setSongDetails({
      title: '',
      artist: '',
      album: '',
      genre: '',
      year: '',
      description: '',
      isPublic: true,
      allowDownload: false,
      tags: []
    });
    setUploadedFiles([]);
    setUploadProgress({});
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (currentStep === 'success') {
    return (
      <div className="upload-container">
        <div className="success-container">
          <div className="success-icon">✅</div>
          <h2>Upload Successful!</h2>
          <p>Your song "{songDetails.title}" has been uploaded successfully.</p>
          <div className="success-actions">
            <button onClick={resetUpload} className="upload-another-btn">
              Upload Another Song
            </button>
            <button className="view-library-btn">
              View in Library
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'details') {
    return (
      <div className="upload-container">
        <div className="upload-header">
          <button onClick={() => setCurrentStep('upload')} className="back-btn">
            ← Back
          </button>
          <h1>Song Details</h1>
        </div>

        <div className="details-container">
          <div className="file-preview">
            <div className="file-icon">🎵</div>
            <div className="file-info">
              <h3>{selectedFile?.name}</h3>
              <p>{formatFileSize(selectedFile?.size)}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="details-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Song Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={songDetails.title}
                  onChange={handleDetailsChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="artist">Artist *</label>
                <input
                  type="text"
                  id="artist"
                  name="artist"
                  value={songDetails.artist}
                  onChange={handleDetailsChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="album">Album</label>
                <input
                  type="text"
                  id="album"
                  name="album"
                  value={songDetails.album}
                  onChange={handleDetailsChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <select
                  id="genre"
                  name="genre"
                  value={songDetails.genre}
                  onChange={handleDetailsChange}
                >
                  <option value="">Select Genre</option>
                  <option value="pop">Pop</option>
                  <option value="rock">Rock</option>
                  <option value="hip-hop">Hip Hop</option>
                  <option value="electronic">Electronic</option>
                  <option value="jazz">Jazz</option>
                  <option value="classical">Classical</option>
                  <option value="country">Country</option>
                  <option value="r&b">R&B</option>
                  <option value="indie">Indie</option>
                  <option value="alternative">Alternative</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="year">Release Year</label>
              <input
                type="number"
                id="year"
                name="year"
                value={songDetails.year}
                onChange={handleDetailsChange}
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={songDetails.description}
                onChange={handleDetailsChange}
                rows="4"
                placeholder="Tell us about your song..."
              />
            </div>

            <div className="form-group">
              <label>Tags</label>
              <div className="tags-input">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add tags..."
                />
                <button type="button" onClick={addTag}>Add</button>
              </div>
              <div className="tags-list">
                {songDetails.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>×</button>
                  </span>
                ))}
              </div>
            </div>

            <div className="form-group">
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={songDetails.isPublic}
                    onChange={handleDetailsChange}
                  />
                  Make this song public
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="allowDownload"
                    checked={songDetails.allowDownload}
                    onChange={handleDetailsChange}
                  />
                  Allow downloads
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setCurrentStep('upload')} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="publish-btn">
                Publish Song
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="upload-container">
      <div className="upload-header">
        <h1>Upload Your Music</h1>
        <p>Share your music with the world</p>
      </div>

      <div 
        className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFormats.join(',')}
          onChange={handleFileInput}
          style={{ display: 'none' }}
        />
        
        <div className="upload-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="10,9 9,9 9,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h3>Drag and drop your music files here</h3>
        <p>or click to browse</p>
        <div className="upload-info">
          <p>Supported formats: {acceptedFormats.join(', ')}</p>
          <p>Maximum file size: 100MB</p>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <h3>Uploaded Files</h3>
          {uploadedFiles.map((file) => (
            <div key={file.id} className="file-item">
              <div className="file-info">
                <div className="file-icon">🎵</div>
                <div className="file-details">
                  <div className="file-name">{file.name}</div>
                  <div className="file-size">{formatFileSize(file.size)}</div>
                </div>
              </div>
              
              <div className="file-progress">
                {file.status === 'uploading' && (
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${uploadProgress[file.id] || 0}%` }}
                    />
                  </div>
                )}
                {file.status === 'completed' && (
                  <div className="file-actions">
                    <button 
                      onClick={() => proceedToDetails(file)}
                      className="details-btn"
                    >
                      Add Details
                    </button>
                    <button 
                      onClick={() => removeFile(file.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Upload;
