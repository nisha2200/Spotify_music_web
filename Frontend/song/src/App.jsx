import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Home from "./components/Home";
import Search from "./components/Search";
import Register from "./components/Register";
import Upload from "./components/Upload";
import MusicPlayer from "./components/MusicPlayer";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "search":
        return <Search />;
      case "register":
        return <Register />;
      case "upload":
        return <Upload />;
      case "library":
      case "recently-played":
      case "liked-songs":
      case "albums":
      case "artists":
      case "podcasts":
        return <Home />; // For now, show Home for all library items
      default:
        if (activeTab.startsWith("playlist-")) {
          return <Home />; // Show playlist content
        }
        return <Home />;
    }
  };

  const handleRegisterClick = () => {
    setActiveTab("register");
  };

  const handleUploadClick = () => {
    setActiveTab("upload");
  };

  return (
    <div className="app">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="main-content">
        <TopBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onRegisterClick={handleRegisterClick}
          onUploadClick={handleUploadClick}
        />
        {renderContent()}
      </main>
      <MusicPlayer currentSong={currentSong} isVisible={isPlayerVisible} />
    </div>
  );
}

export default App;
