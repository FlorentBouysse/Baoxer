/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import './SkillDetail.scss';

const SkillDetail = ({ skill, player }) => {
  // for each strength level of player , add 8% damage to the skill
  const newSkillDamage = Math.ceil(
    skill.damage + (skill.damage * (player.strength_id * 8)) / 100
  );

  return (
    <div className="skillDetail">
      <div className="skillDetail-info">
        <h4>{skill.name}</h4>
        <div className="skillDetail-info-description">
          <h4>Description</h4>
          <p className="description">{skill.description}</p>
        </div>
        <div className="skillDetail-info-cost">
          <div className="section">
            <h5>Dégats infligés</h5>
            <div className="section-container">
              <div
                className="damage"
                style={{
                  width: `${newSkillDamage}%`,
                  minWidth: 'fit-content',
                }}
              >
                {newSkillDamage || ''}
              </div>
            </div>
          </div>
          <div className="section">
            <h5>Cout en énergie</h5>
            <div className="section-container">
              <div
                className="energy"
                style={{
                  width: `${skill.energyCost}%`,
                  minWidth: 'fit-content',
                }}
              >
                {skill.energyCost}
              </div>
            </div>
          </div>
        </div>
        {skill.effect && (
          <div className="special">
            <h4>Effet spécial</h4>
            <p>{skill.effect}</p>
          </div>
        )}
      </div>
    </div>
  );
};

SkillDetail.propTypes = {};

export default SkillDetail;
