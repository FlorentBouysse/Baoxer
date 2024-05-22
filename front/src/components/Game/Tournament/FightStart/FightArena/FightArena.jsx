/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './FightArena.scss';

const FightArena = ({ skillLaunched, isBot, count }) => {
  const [isAnimation, setIsAnimation] = useState(false);
  const [isSkill, setIsSkill] = useState(false);

  useEffect(() => {
    setIsAnimation(true);
    setIsSkill(true);
    setTimeout(() => {
      setIsAnimation(false);
      setIsSkill(false);
    }, 1000);
  }, [count]);

  return (
    <div className="fight-arena">
      <div className="view" />
      {count > 0 && (
        <div className={!isBot ? 'fight-skills' : 'fight-skills-bot'}>
          {isBot && (
            <div className={isAnimation ? 'launched' : 'static'}>
              {isSkill && (
                <button
                  label="skill"
                  type="button"
                  className={skillLaunched.icon}
                />
              )}
            </div>
          )}
          {!isBot && (
            <div className={isAnimation ? 'launched-npc' : 'static-npc'}>
              {isSkill && (
                <button
                  label="skill"
                  type="button"
                  className={skillLaunched.icon}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FightArena;
