/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './ClockLocal.scss';

const ClockLocal = ({
  shown,
  currentStamina,
  setCurrentStamina,
  max,
  setCurrentTime,
  currentTime,
}) => {
  // Simple clock updated every second
  // Used to update every minutes players's stamina
  const [cssClass, setCssClass] = useState('');

  useEffect(() => {
    if (shown) {
      setCssClass('');
    } else {
      setCssClass('hidden');
    }
  }, [shown]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentTime > 0) {
        setCurrentTime(currentTime - 1);
      } else {
        setCurrentTime(60);
        setCurrentStamina(currentStamina + 1);

        if (currentStamina === max) {
          setCurrentStamina(max);
        }
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [currentTime]);

  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')} : ${String(
    seconds
  ).padStart(2, '0')}`;

  return (
    <div className={`TimerRegenEnergy ${cssClass}`}>
      <p className="timer">{formattedTime}</p>
    </div>
  );
};

export default ClockLocal;
