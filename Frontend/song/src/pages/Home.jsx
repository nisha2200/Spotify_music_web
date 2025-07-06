import React, { useEffect } from "react";
import './Home.css'



const Home =()=>{
    const dispatch = useDispatch()
    const songs = useSelector(selectSongs)
    const currentSong = useSelector(selectCurrentSong)
    const isPlaying = useSelector(selectIsPlaying)

    const handlePlaySong =  (song)=>{
        dispatch(setCuurentSong(song))
    }

    useEffect(() => {
      axios.get("http://localhost:3000/songs/get-songs",{
        withCredentials:true
      })
      .then(response=>{
        console.log(response.data)
        dispatch(setSongs(response.data.songs))
      })
  
    }, [])
    return (
        <section className="home-section">
            <div className="app-header">
                <h1 className="app-title">Stream</h1>
                <Link to="/search" className="search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                </Link>
            </div>

            <div className="song-list">
                {songs.map(song => (
                    <div
                        key={song._id}
                        className="song-item"
                        onClick={() => handlePlaySong(song)}
                    >
                        <img
                            src={song.poster}
                            alt={song.title}
                            className="song-image"
                        />
                        <div className="song-details">
                            <div className="song-title">{song.title}</div>
                            <div className="song-artist">{song.artist}</div>
                        </div>
                    </div>
                ))}
            </div>

                <NowPlaying 
                currentSong = {currentSong}
                isPlaying = {isPlaying}
                togglePlayPause ={()=> dispatch(togglePlayPause())}
                />

                <Navigation/>
        </section>

    )
    


}
export default Home