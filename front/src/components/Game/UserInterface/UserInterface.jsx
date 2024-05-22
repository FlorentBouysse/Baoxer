/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Menu, Map, Settings as Setting } from 'react-feather';
import { Link } from 'react-router-dom';
import Settings from './Settings/Settings';
import PlayerStats from './PlayerStats/PlayerStats';
import ClockLocal from '../../ClockLocal/ClockLocal';
import Music from './Music/Music';
import './UserInterface.scss';

const UserInterface = ({
  player,
  setGetGame,
  staminaLevel,
  playerLevelExperience,
  playerLevel,
  currentNpc,
  money,
  handleNewPoint,
  currentEnergy,
  isTrainingDone,
  isFightDone,
}) => {
  const [staminaTime, setStaminaTime] = useState(false);

  const [health, setHealth] = useState(
    parseInt(player.health) + parseInt(player.level_id) * 5
  );

  const [stamina, setStamina] = useState(
    parseInt(player.energy) + parseInt(player.stamina) * 5
  );
  const [currentStamina, setCurrentStamina] = useState(
    parseInt(player.current_energy)
  );

  const [experience, setExperience] = useState(1000);
  const [currentExperience, setCurrentExperience] = useState(
    parseInt(player.level_experience)
  );

  const [currentTime, setCurrentTime] = useState(60);

  const [cash, setCash] = useState(parseInt(player.money));

  const [isStats, setIsStats] = useState(false);
  const [isSettings, setIsSettings] = useState(false);

  const imageUrl = `public/asset/playerImage/player-${parseInt(
    player.picture
  )}.png`;

  useEffect(() => {
    setStamina(parseInt(player.energy) + parseInt(player.stamina_id) * 5);
    setCurrentExperience(parseInt(player.level_experience));
    setHealth(parseInt(player.health) + parseInt(player.level_id) * 5);
    setCurrentStamina(parseInt(player.current_energy));
    setCash(parseInt(player.money));
  }, [
    staminaLevel,
    playerLevelExperience,
    playerLevel,
    currentNpc,
    player.energy,
    player.stamina,
    player.health,
    money,
    player,
    currentEnergy,
  ]);

  return (
    <div className="ui">
      <ClockLocal
        shown={staminaTime}
        currentStamina={currentStamina}
        setCurrentStamina={setCurrentStamina}
        max={stamina}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
      />
      <div className="ui-info">
        <div className="ui-info-avatar">
          <img
            className="player-avatar"
            src={imageUrl}
            alt="Avatar du boxeur"
          />
          <p className="level">Lv. {parseInt(player.level_id)}</p>
          <p className="level">{cash} $</p>
        </div>
        <div className="ui-info-stats">
          <div className="health-bar">
            <div className="health" style={{ width: '100%' }}>
              {health}
            </div>
          </div>
          <div
            className="stamina-bar"
            onMouseOut={() => setStaminaTime(false)}
            onMouseOver={() => setStaminaTime(true)}
          >
            <div
              className="stamina"
              style={{ width: `${(currentStamina / stamina) * 100}% ` }}
            >
              {currentStamina} / {stamina}
            </div>
          </div>
          <div className="experience-bar">
            <div
              className="experience"
              style={{
                width: `${(currentExperience / experience) * 100}% `,
                minWidth: 'fit-content',
              }}
            >
              {currentExperience} / {experience}
            </div>
          </div>
        </div>

        <button
          type="button"
          label="stats"
          className="player-info-button"
          onClick={() => {
            setIsStats(!isStats);
          }}
        >
          <Menu />
          {parseInt(player.available_stats_points) > 0 ? (
            <p className="available-point">
              {parseInt(player.available_stats_points)}
            </p>
          ) : (
            ''
          )}
        </button>

        <Link to="/jeu">
          <button type="button" label="map" className="player-info-map">
            <Map />
          </button>
        </Link>
        <Music isTrainingDone={isTrainingDone} isFightDone={isFightDone} />
      </div>
      <button
        type="button"
        label="setting"
        className="settings"
        onClick={() => {
          setIsSettings(!isSettings);
        }}
      >
        <Setting />
      </button>
      {isSettings && <Settings setGetGame={setGetGame} />}
      {isStats && (
        <PlayerStats
          player={player}
          handleNewPoint={handleNewPoint}
          setIsStats={setIsStats}
        />
      )}
    </div>
  );
};

UserInterface.propTypes = {};

export default UserInterface;
