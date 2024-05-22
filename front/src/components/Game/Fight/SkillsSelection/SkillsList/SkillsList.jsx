/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import './SkillsList.scss';

const SkillsList = ({ skillTier, title, handleSkillButtonClick, player }) => {
  return (
    <div className="skills-container">
      <h2>{title}</h2>
      <div className="skills-container-list">
        {skillTier.map((currentBasicSkill) => {
          // for each strength level of player , add 8% damage to the skill
          const newSkillDamage = Math.ceil(
            currentBasicSkill.damage +
              (currentBasicSkill.damage * (parseInt(player.strength_id) * 8)) /
                100
          );
          return (
            <div className={currentBasicSkill.type} key={currentBasicSkill.id}>
              <button
                type="button"
                label="skill"
                className={currentBasicSkill.icon}
                onClick={() => {
                  handleSkillButtonClick(currentBasicSkill);
                }}
              />
              <div className="skill-info">
                <div className="skill-damage-info">
                  <span
                    style={{
                      width: `${newSkillDamage}%`,
                    }}
                    className="skill-damage"
                  />
                </div>
                <div className="skill-energy-info">
                  <span
                    style={{
                      width: `${currentBasicSkill.energyCost}%`,
                    }}
                    className="skill-energy"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

SkillsList.propTypes = {};

export default SkillsList;
