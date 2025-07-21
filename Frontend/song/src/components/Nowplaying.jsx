import React from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { setCurrentSong, selectIsPlaying, togglePlayPause } from '../redux/features/songSlice'
import './Nowplaying.css'
const Nowplaying = () => {
    const dispatch = useDispatch();
    const reduxCurrentSong = useSelector(setCurrentSong)
    const reduxIsPlaying = useSelector(selectIsPlaying)

    const currentSong = songProp || reduxCurrentSong
    const isPlaying = isPlaying !== undefined ? isPlaying : reduxIsPlaying;

    const handleTogglePlayPause =()=>{
        if(togglePlayPause){
            togglePlayPause();
        }else{
            dispatch(togglePlayPause());
        }
    }

    return(
         <div className="now-playing">
            <img
                src={currentSong.poster}
                alt={currentSong.title}
                className="now-playing-image"
            />
            <div className="now-playing-details">
                <div className="now-playing-title">{currentSong.title}</div>
                <div className="now-playing-artist">{currentSong.artist}</div>
            </div>
            <button className="play-button" onClick={handleTogglePlayPause}>

                {isPlaying ? (
                    <>
                        <audio src={currentSong.audio} autoPlay controls style={{ display: 'none' }} ></audio>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="6" y="4" width="4" height="16"></rect>
                            <rect x="14" y="4" width="4" height="16"></rect>
                        </svg>
                    </>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                )}
            </button>
        </div>
    )
}

export default Nowplaying;