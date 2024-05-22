/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from 'react-router-dom';

import SkillsList from './SkillsList/SkillsList';
import SelectedSkills from './SelectedSkills/SelectedSkills';
import SkillDetail from './SkillDetail/SkillDetail';

import './SkillsSelection.scss';

const SkillsSelection = ({
  player,
  selectedSkillsList,
  setSelectedSkillsList,
  skillsList,
  handleFightEnergyCost,
}) => {
  const basicSkills = skillsList.filter(
    (skill) =>
      skill.type === 'Coup simple' &&
      skill.levelRequired < parseInt(player.level_id)
  );
  const heavySkills = skillsList.filter(
    (skill) =>
      skill.type === 'Coup lourd' &&
      skill.levelRequired < parseInt(player.level_id)
  );
  const defensiveSkills = skillsList.filter(
    (skill) =>
      skill.type === 'Parer' && skill.levelRequired < parseInt(player.level_id)
  );
  const specialSkills = skillsList.filter(
    (skill) =>
      skill.type === 'Special' &&
      skill.levelRequired < parseInt(player.level_id)
  );

  const [selectedSkillPlayer, setSelectedSkillPlayer] = useState([]);
  const [haveEnoughEnergy, setHaveEnoughEnergy] = useState(true);

  const handleSkillButtonClick = (skill) => {
    if (selectedSkillsList.length < 4) {
      let isAlreadyInList = false;

      selectedSkillsList.forEach((currentSkill) => {
        if (currentSkill.name === skill.name) {
          isAlreadyInList = true;
        }
      });
      if (!isAlreadyInList) {
        setSelectedSkillsList((prevSkillsList) => [...prevSkillsList, skill]);
      }
    }
    setSelectedSkillPlayer(skill);
  };

  return (
    <div className="skills">
      <div className="skills-list">
        <SkillsList
          skillTier={basicSkills}
          title="Attaque simple"
          handleSkillButtonClick={handleSkillButtonClick}
          player={player}
        />
        <SkillsList
          skillTier={heavySkills}
          title="Attaque Lourde"
          handleSkillButtonClick={handleSkillButtonClick}
          player={player}
        />
        <SkillsList
          skillTier={defensiveSkills}
          title="Technique defensive"
          handleSkillButtonClick={handleSkillButtonClick}
          player={player}
        />
        <SkillsList
          skillTier={specialSkills}
          title="Technique spécial"
          handleSkillButtonClick={handleSkillButtonClick}
          player={player}
        />
      </div>
      <div className="skills-selected">
        <div className="skills-selected-list">
          <SelectedSkills
            selectedSkillsList={selectedSkillsList}
            setSelectedSkillsList={setSelectedSkillsList}
            player={player}
          />
        </div>
        <div className="skills-info">
          <SkillDetail skill={selectedSkillPlayer} player={player} />
        </div>
        {!haveEnoughEnergy && <p className="notAllowed">Pas assez d'énergie</p>}
        <div className="start-fight">
          <div className="animation" />
          <Link to="/combat-tounoi">
            <button
              type="button"
              className="start-fight-button"
              onClick={(event) => {
                if (player.current_energy - 20 >= 0) {
                  handleFightEnergyCost();
                } else {
                  event.preventDefault();
                  setHaveEnoughEnergy(false);
                }
              }}
            >
              Lancer le combat !
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SkillsSelection;
