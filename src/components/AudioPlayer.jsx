import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = ({ episode, onEpisodeListened }) => {
  const [isPlaying, setIsPlaying] = useState(false); // Track whether audio is playing
  const [progress, setProgress] = useState(0); // Track playback progress
  const audioRef = useRef(null); // Ref to access the <audio> element

  // Toggle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause(); // Pause the audio
      } else {
        audioRef.current.play(); // Play the audio
      }
      setIsPlaying(!isPlaying); // Update the play/pause state
    }
  };

  // Handle the timeupdate event to track progress
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (audio) {
        const currentProgress = (audio.currentTime / audio.duration) * 100;
        setProgress(currentProgress);

        // Check if the episode has been listened to all the way through
        if (currentProgress >= 99.9) { // 99.9% to account for minor discrepancies
          onEpisodeListened(episode.id); // Notify parent component
        }
      }
    };

    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
    }

    // Clean up the event listener
    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [episode.id, onEpisodeListened]);

  return (
    <div className="audio-player">
      {/* Ensure episode file is passed correctly */}
      <audio ref={audioRef} src={episode?.file} controls />
      <button onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default AudioPlayer;
