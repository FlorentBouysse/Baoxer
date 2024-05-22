/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal/Modal';
import SkillInfoBubble from './SkillInfoBubble/SkillInfoBubble';
import './Fight.scss';

const Fight = ({ npc, npcSkillsList }) => {
  const title = 'Bienvenue dans la salle de combat Baoxeur !';
  const content =
    "C'est ici que la magie s'opère , viens tester ton Baoxeur et tes nouvelles compétences contre des ennemies tous plus argneux les uns que les autres !";

  const [isFightViewOpen, setIsFightViewOpen] = useState(false);

  // ------- Hover ------- //
  const [skillhovered, setSkillHovered] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [imageUrl, setImageUrl] = useState(parseInt(npc.picture));

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  useEffect(() => {
    if (parseInt(npc.picture) > 12) {
      setImageUrl(8);
    } else {
      setImageUrl(parseInt(npc.picture));
    }
  }, [npc]);

  const avatar = `public/asset/Characters/character-${imageUrl}.png`;

  return (
    <div className="fight Fighting">
      <Modal title={title} content={content} />
      {isHovered && skillhovered && <SkillInfoBubble skill={skillhovered} />}
      <div className="fight-info">
        <button
          className="fight-info-launch"
          type="button"
          label="launch"
          onClick={() => {
            setIsFightViewOpen(!isFightViewOpen);
          }}
        >
          Voir le prochain combat !
        </button>
      </div>
      {isFightViewOpen && (
        <div className="fight-preview">
          <button
            className="fight-info-close"
            type="button"
            label="close"
            onClick={() => {
              setIsFightViewOpen(!isFightViewOpen);
            }}
          >
            X
          </button>
          <h2 className="main-title">Prochain combat</h2>
          <div className="npc-info">
            <img
              src={avatar}
              className="npc-avatar"
              alt="Image du prochain adversaire"
            />
            <div className="npc-info-detail">
              <h2>{npc.username}</h2>
              <h2>Description</h2>
              <p className="description">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus
                molestias voluptatibus nostrum eaque numquam rem cumque
                obcaecati soluta? Distinctio eveniet, error pariatur rem eius
                perferendis repudiandae magni est laudantium blanditiis!
              </p>
              <h2>Statistiques de l'adversaire</h2>
              <div className="stats">
                <div className="health-bar">
                  <div className="health">{npc.health}</div>
                </div>
                <div className="energy-bar">
                  <div className="energy">{npc.energy}</div>
                </div>
              </div>
              <div className="npc-skills">
                {npcSkillsList.map((currentNpcSkill) => {
                  return (
                    <div
                      key={currentNpcSkill.id}
                      className={`skill ${currentNpcSkill.icon}`}
                      onMouseOver={() => {
                        setIsHovered(true);
                        setSkillHovered(currentNpcSkill);
                      }}
                      onMouseOut={() => setIsHovered(false)}
                    />
                  );
                })}
              </div>
              <Link to="/choix-competence">
                <button type="button" className="start">
                  Choisir ses compétences
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Fight.propTypes = {};

export default Fight;
