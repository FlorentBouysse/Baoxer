/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
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
  const [currentFight, setCurrentFight] = useState(0);

  const [reduceDamage, setReduceDamage] = useState(false);
  const [buffEnergy, setBuffEnergy] = useState(false);
  const [buffHealth, setBuffHealth] = useState(false);

  useEffect(() => {
    if (!haveHealth) {
      if (winner === player.username) {
        setWinner('');
        window.location.href = '/jeu';
      } else if (winner === npc.username) {
        setIsBot(false);
        setCurrentFight(currentFight + 1);
        setCount(0);
        setIsEndFight(true);
      }
    }
  }, [haveHealth]);

  useEffect(() => {
    if (isEndFight) {
      setHaveHealth(false);
      if (currentFight === 3) {
        const tournament = true;
        handleFightWin(tournament);
      }
    }
  }, [isEndFight]);

  useEffect(() => {
    if (isBot) {
      setModalPlayer(playerData.username);
      if (reduceDamage) {
        setModalInfo(Math.round(damageDealtByPlayer / 2));
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
          setReduceDamage={setReduceDamage}
          reduceDamage={false}
          setBuffEnergy={setBuffEnergy}
          buffEnergy={false}
          setBuffHealth={setBuffHealth}
          buffHealth={false}
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
          {currentFight === 3 ? (
            <Link to="/jeu">
              <div className="fight-end-content">
                <h2>Félicitation</h2>
                <p>
                  Bravo ! Vous gagnez <span>1000exp</span> et <span>500$</span>
                </p>
                <p>Clickez ci dessous pour récuperer vos récompenses</p>
                <button
                  type="button"
                  className="fight-end-button"
                  onClick={() => {
                    setCurrentNpc(currentNpc + 1);
                    setDamageDealtByPlayer('');
                    setDamageDealtByNpc('');
                    setSkillLaunched('');
                    setPlayerData(player);
                    setWinner('');
                    setIsEndFight(false);
                    setHaveHealth(true);
                    setCurrentFight(0);
                  }}
                >
                  Retour au menu
                </button>
              </div>
            </Link>
          ) : (
            <div className="fight-end-content">
              <h2>Félicitation</h2>
              <p>Bravo !</p>
              <p>Clickez ci dessous pour passer au combat suivant</p>
              <button
                type="button"
                className="fight-end-button"
                onClick={() => {
                  if (currentFight === 1) {
                    setCurrentNpc(currentNpc + 1);
                  } else {
                    setCurrentNpc(currentNpc + 2);
                  }
                  setDamageDealtByPlayer('');
                  setDamageDealtByNpc('');
                  setSkillLaunched('');
                  setPlayerData(player);
                  setWinner('');
                  setIsEndFight(false);
                  setHaveHealth(true);
                }}
              >
                Combat suivant
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FightStart;
