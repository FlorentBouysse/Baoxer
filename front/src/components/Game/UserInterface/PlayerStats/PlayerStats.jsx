/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import './PlayerStats.scss';
import MenuStat from './MenuStat/MenuStat';

const PlayerStats = ({ player, handleNewPoint, setIsStats }) => {
  const [addStrength, setAddStrength] = useState(0);
  const [addAgility, setAddAgility] = useState(0);
  const [addStamina, setAddStamina] = useState(0);
  const [max, setMax] = useState(parseInt(player.available_stats_points));
  const [maxReached, setMaxReached] = useState(false);
  const [amount, setAmount] = useState(0);
  const strength = 'Force';
  const agility = 'Agilité';
  const stamina = 'Endurance';
  return (
    <div className="playerStats">
      <h2>
        Points disponibles{' '}
        <span>{parseInt(player.available_stats_points)}</span>
      </h2>
      <MenuStat
        stat={strength}
        current={parseInt(player.strength_id) + addStrength}
        currentSetter={addStrength}
        setter={setAddStrength}
        experience={parseInt(player.strength_experience)}
        maxExperience="1000"
        setAmount={setAmount}
        amount={amount}
        setMaxReached={setMaxReached}
        max={max}
      />
      <MenuStat
        stat={agility}
        current={parseInt(player.agility_id) + addAgility}
        currentSetter={addAgility}
        setter={setAddAgility}
        experience={parseInt(player.agility_experience)}
        maxExperience="1000"
        setAmount={setAmount}
        amount={amount}
        setMaxReached={setMaxReached}
        max={max}
      />
      <MenuStat
        stat={stamina}
        current={parseInt(player.stamina_id) + addStamina}
        currentSetter={addStamina}
        setter={setAddStamina}
        experience={parseInt(player.stamina_experience)}
        maxExperience="1000"
        setAmount={setAmount}
        amount={amount}
        setMaxReached={setMaxReached}
        max={max}
      />
      <button
        type="button"
        className="validate"
        onClick={() => {
          setAmount(0);
          setIsStats(false);
        }}
      >
        Annuler
      </button>
      <button
        type="button"
        className="validate v"
        onClick={() => {
          handleNewPoint(addStrength, addStamina, addAgility);
          setIsStats(false);
          const pointSound = new Audio(
            `public/asset/Audio/SFX/sfx_point_added.mp3`
          );
          pointSound.play();
        }}
      >
        Valider
      </button>
    </div>
  );
};

PlayerStats.propTypes = {};

export default PlayerStats;
