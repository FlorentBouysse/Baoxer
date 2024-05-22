/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal/Modal';
import SkillInfoBubble from './SkillInfoBubble/SkillInfoBubble';
import './Tournament.scss';

const Tournament = ({ npc, npcSkillsList }) => {
  const title = 'Bienvenue dans la salle de tournoi Baoxeur !';
  const content =
    'Ici tu affronteras les combattants les plus dangereux de Baoxing, a toi de jouer !';

  const [isFightViewOpen, setIsFightViewOpen] = useState(false);

  // ------- Hover ------- //
  const [skillhovered, setSkillHovered] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  // --------------- STATE --------------- //
  // const [isReadyToFight, setIsReadyToFight] = useState(false);

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <div className="fight">
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
              src={`/asset/Characters/character-${
                npc.picture > 12 ? generateRandomNumber(1, 11) : npc.picture
              }.png`}
              className="npc-avatar"
              alt="Image du prochain adversaire"
            />
            <div className="npc-info-detail">
              <h2 className="username">{npc.username}</h2>
              <h2>Description</h2>
              <p className="description">
                {npc.username} , est une force de la nature sur le ring. Avec
                des bras aussi massifs que des troncs d'arbre, il envoie ses
                adversaires hors de l'orbite avec chaque uppercut
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
              <Link to="/choix-competence-tournoi">
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

export default Tournament;
