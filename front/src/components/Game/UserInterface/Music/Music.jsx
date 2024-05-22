/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef, useState } from 'react';
import { Music as MusicIcon } from 'react-feather';

const Music = ({ isTrainingDone, isFightDone }) => {
  const music = useRef(null);
  const [volume, setVolume] = useState(0.3);
  const [isMusic, setIsMusic] = useState(false);
  const [src, setSrc] = useState('public/asset/Audio/Music/msc_main.mp3');

  const handlePlayMusic = (bool) => {
    const audio = music.current;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    if (bool) {
      audio.pause();
      setSrc('public/asset/Audio/Music/msc_main.mp3');
    }
  };

  useEffect(() => {
    if (isTrainingDone) {
      const trainingSound = new Audio(
        `public/asset/Audio/SFX/sfx_training_finished.mp3`
      );
      trainingSound.volume = 0.2;
      trainingSound.play();
    }
  }, [isTrainingDone]);

  useEffect(() => {
    if (isFightDone) {
      setSrc('public/asset/Audio/Music/msc_victory.mp3');
      setTimeout(() => {
        const bool = true;
        setVolume(0.2);
        handlePlayMusic(bool);
      }, 6000);
    }
  }, [isFightDone]);

  const handleVolumeMusic = (event) => {
    const value = parseFloat(event.target.value);
    setVolume(value);
    music.current.volume = value;
  };

  const handleButtonClick = () => {
    const buttonClickSound = new Audio(
      'public/asset/Audio/SFX/sfx_selection.mp3'
    );
    buttonClickSound.volume = 0.2;
    buttonClickSound.play();
  };

  useEffect(() => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      button.addEventListener('click', handleButtonClick);
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener('click', handleButtonClick);
      });
    };
  }, []);

  useEffect(() => {
    const audio = music.current;
    audio.play();
    audio.volume = 0.3;
    setIsMusic(true);

    return () => {
      audio.pause();
    };
  }, [src]);

  useEffect(() => {
    if (window.location.pathname === '/combat') {
      setSrc('public/asset/Audio/Music/msc_fight.mp3');
    } else {
      setSrc('public/asset/Audio/Music/msc_main.mp3');
    }
  }, [window.location.pathname]);

  return (
    <div className="music">
      <button
        className={`player ${isMusic ? 'played' : ''}`}
        type="button"
        onClick={() => {
          handlePlayMusic();
          setIsMusic(!isMusic);
        }}
      >
        <MusicIcon />
      </button>

      <audio ref={music} src={src} volume={volume} loop />
      {isMusic && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeMusic}
        />
      )}
    </div>
  );
};

Music.propTypes = {};

export default Music;
