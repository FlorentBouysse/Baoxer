/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import './SelectedSkills.scss';
import SkillsList from '../SkillsList/SkillsList';

const SelectedSkills = ({
  selectedSkillsList,
  setSelectedSkillsList,
  player,
}) => {
  const handleSkillButtonClick = (skill) => {
    setSelectedSkillsList((prevSkillsList) => {
      const skillIndex = prevSkillsList.findIndex(
        (selectedSkill) => selectedSkill.id === skill.id
      );

      if (skillIndex !== -1) {
        // Si le skill est déjà dans la liste

        const updatedSkillsList = [...prevSkillsList];
        updatedSkillsList.splice(skillIndex, 1);
        return updatedSkillsList;
      }
      return [...prevSkillsList, skill];
    });
  };
  return (
    <div className="selected-skills-container">
      <div className="selected-skills-container-list">
        <SkillsList
          skillTier={selectedSkillsList}
          title="Compétences équipés"
          handleSkillButtonClick={handleSkillButtonClick}
          player={player}
        />
      </div>
    </div>
  );
};

SelectedSkills.propTypes = {};

export default SelectedSkills;
