/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import './SkillInfoBubble.scss';

const SkillInfoBubble = ({ skill }) => {
  return (
    <div className="bubble">
      <div className={`skill ${skill.icon}`} />
      <h2>Nom de la compétence</h2>
      <p>{skill.name}</p>
      <h2>Description</h2>
      <p>{skill.description}</p>
      <div className="stats">
        <div className="damage-bar">
          <div className="damage">{skill.damage}</div>
        </div>
        <div className="energy-bar">
          <div className="energy">{skill.energyCost}</div>
        </div>
      </div>
    </div>
  );
};

SkillInfoBubble.propTypes = {};

export default SkillInfoBubble;
