/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import FightArena from './FightArena/FightArena';
import FighterFrame from './FighterFrame/FighterFrame';
import Modal from '../Modal/Modal';
import './FightStart.scss';

const FightStart = ({
  player,
  selectedSkillsList,
  npc,
  npcSkillsList,
  setCurrentNpc,
  currentNpc,
  handleFightWin,
}) => {
  const [skillLaunched, setSkillLaunched] = useState('');
  const [isBot, setIsBot] = useState(false);
  const [count, setCount] = useState(0);
  const [damageDealtByPlayer, setDamageDealtByPlayer] = useState('');
  const [damageDealtByNpc, setDamageDealtByNpc] = useState('');
  const [haveHealth, setHaveHealth] = useState(true);
  const [winner, setWinner] = useState('');
  const [playerData, setPlayerData] = useState(player);
  const [modalInfo, setModalInfo] = useState('');
  const [modalPlayer, setModalPlayer] = useState('');
  const [isEndFight, setIsEndFight] = useState(false);

  const [reduceDamage, setReduceDamage] = useState(false);
  const [buffEnergy, setBuffEnergy] = useState(false);
  const [buffHealth, setBuffHealth] = useState(false);

  const [reduceDamageNpc, setReduceDamageNpc] = useState(false);
  const [buffEnergyNpc, setBuffEnergyNpc] = useState(false);
  const [buffHealthNpc, setBuffHealthNpc] = useState(false);

  useEffect(() => {
    if (!haveHealth) {
      if (winner === player.username) {
        setWinner('');
        window.location.href = '/jeu';
      } else if (winner === npc.username) {
        setIsEndFight(true);
        setIsBot(false);
        setCount(0);
      }
    }
  }, [haveHealth]);

  useEffect(() => {
    if (isEndFight) {
      setHaveHealth(false);
      handleFightWin();
    }
  }, [isEndFight]);

  useEffect(() => {
    if (isBot) {
      setModalPlayer(playerData.username);
      setBuffEnergyNpc(false);
      setBuffHealthNpc(false);
      setReduceDamageNpc(false);
      if (reduceDamage) {
        setModalInfo(Math.round(damageDealtByPlayer / 2));
        setReduceDamageNpc(false);
      } else {
        setModalInfo(damageDealtByPlayer);
      }
    } else {
      setModalPlayer(npc.username);
      setBuffEnergy(false);
      setBuffHealth(false);
      setReduceDamage(false);
      if (reduceDamage) {
        setModalInfo(Math.round(damageDealtByNpc / 2));
        setReduceDamage(false);
      } else {
        setModalInfo(damageDealtByNpc);
      }
    }
  }, [count]);

  return (
    <div className="Fight">
      <div className="Fight-fighter">
        <FighterFrame
          player={playerData}
          skillsList={selectedSkillsList}
          setSkillLaunched={setSkillLaunched}
          setIsBot={setIsBot}
          setCount={setCount}
          count={count}
          setDamageDealt={setDamageDealtByPlayer}
          damage={damageDealtByNpc}
          haveHealth={setHaveHealth}
          setWinner={setWinner}
          resetDamage={setDamageDealtByNpc}
          isBot={isBot}
          dead={haveHealth}
          setReduceDamage={setReduceDamage}
          reduceDamage={reduceDamage}
          setBuffEnergy={setBuffEnergy}
          buffEnergy={buffEnergy}
          setBuffHealth={setBuffHealth}
          buffHealth={buffHealth}
        />
      </div>
      <div />
      <div className="Fight-arena">
        <FightArena skillLaunched={skillLaunched} isBot={isBot} count={count} />
      </div>
      <div />
      <div className="Fight-fighter">
        <FighterFrame
          player={npc}
          skillsList={npcSkillsList}
          setSkillLaunched={setSkillLaunched}
          setIsBot={setIsBot}
          setCount={setCount}
          count={count}
          setDamageDealt={setDamageDealtByNpc}
          damage={damageDealtByPlayer}
          haveHealth={setHaveHealth}
          setWinner={setWinner}
          resetDamage={setDamageDealtByPlayer}
          isBot={isBot}
          setReduceDamage={setReduceDamageNpc}
          reduceDamage={reduceDamageNpc}
          setBuffEnergy={setBuffEnergyNpc}
          buffEnergy={buffEnergyNpc}
          setBuffHealth={setBuffHealthNpc}
          buffHealth={buffHealthNpc}
        />
      </div>
      {count === 0 ? (
        <Modal
          title="combat"
          content={`Bienvenu a tous pour ce combat d'antologie ! Opposant ${player.username} au redoutable ${npc.username}`}
          isFight={true}
          count={count}
        />
      ) : (
        <Modal
          title="Combat"
          sender={modalPlayer}
          damage={modalInfo}
          skill={skillLaunched.name}
          isFight={true}
          count={count}
        />
      )}
      {!haveHealth && (
        <div className="fight-end">
          <div className="fight-end-content">
            <h2>Félicitation</h2>
            <p>
              Bravo ! Vous gagnez <span>200</span>Exp et <span>100</span>${' '}
            </p>
            <p>Clickez ci dessous pour récuperer vos récompenses</p>
            <Link to="/jeu">
              <button
                type="button"
                className="fight-end-button"
                onClick={() => {
                  setCurrentNpc(currentNpc);
                  setDamageDealtByPlayer('');
                  setDamageDealtByNpc('');
                  setSkillLaunched('');
                  setPlayerData(player);
                  setWinner('');
                  setIsEndFight(false);
                  setHaveHealth(true);
                }}
              >
                Retour a l'accueil
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default FightStart;
