/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './FighterFrame.scss';

const FighterFrame = ({
  player,
  skillsList,
  setSkillLaunched,
  setIsBot,
  count,
  setCount,
  damage,
  setDamageDealt,
  haveHealth,
  setWinner,
  resetDamage,
  isBot,
  dead,
  setReduceDamage,
  reduceDamage,
  setBuffEnergy,
  buffEnergy,
  setBuffHealth,
  buffHealth,
}) => {
  const [health, setHealth] = useState('');
  const [energy, setEnergy] = useState('');
  const [chances, setChances] = useState('');
  const [currentHealth, setCurrentHealth] = useState('');
  const [currentEnergy, setCurrentEnergy] = useState('');
  const [cooldown, setCooldown] = useState(false);
  const [imageUrl, setImageUrl] = useState(parseInt(player.picture));

  const [noEnergySkill, setNoEnergySkill] = useState(false);

  const [haveBuff, setHaveBuff] = useState(false);
  const [dodge, setDodge] = useState(false);
  const [cancelDamage, setCancelDamage] = useState(false);

  const handleTalentPoints = () => {
    if (player.npc === true) {
      const newHealth = player.level.id * 5 + player.health;
      const newEnergy = player.stamina.id * 5 + player.energy;

      setHealth(newHealth);
      setEnergy(newEnergy);
      setCurrentHealth(newHealth);
      setCurrentEnergy(newEnergy);
    } else {
      const newHealth = parseInt(player.level_id) * 5 + parseInt(player.health);
      const newEnergy =
        parseInt(player.stamina_id) * 5 + parseInt(player.energy);
      const newChances = parseInt(player.agility_id) * 5;

      setHealth(newHealth);
      setEnergy(newEnergy);
      setChances(newChances);
      setCurrentHealth(newHealth);
      setCurrentEnergy(newEnergy);
    }
  };

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  useEffect(() => {
    if (parseInt(player.picture) > 10) {
      setImageUrl(generateRandomNumber(1, 9));
    } else {
      setImageUrl(parseInt(player.picture));
    }
  }, [player]);

  const avatar = `public/asset/Characters/character-${
    parseInt(player.picture) > 12 ? 9 : parseInt(player.picture)
  }.png`;

  useEffect(() => {
    handleTalentPoints();
  }, [skillsList, dead, player]);

  useEffect(() => {
    if (isBot) {
      if (currentHealth - damage > 0) {
        setTimeout(() => {
          const nombreAleatoire = Math.floor(Math.random() * 3);
          const newSkillDamage = Math.ceil(
            skillsList[nombreAleatoire].damage +
              (skillsList[nombreAleatoire].damage *
                (parseInt(player.strength.id) * 8)) /
                100
          );
          setSkillLaunched(skillsList[nombreAleatoire]);
          setCount(count + 1);
          setDamageDealt(newSkillDamage);
          setCurrentEnergy(
            currentEnergy - skillsList[nombreAleatoire].energyCost
          );
        }, 1500);
        setTimeout(() => {
          setIsBot(false);
        }, 1200);
      }
    }
  }, [currentHealth, damage === 0]);

  useEffect(() => {
    if (currentHealth < 0) {
      haveHealth(false);
      setWinner(player.username);
    }
  }, [currentHealth]);

  const handleBuff = (skill) => {
    if (skill.type === 'defensive') {
      const isFail = generateRandomNumber(1, 2);
      if (isFail === 1) {
        setHaveBuff(true);
        setDodge(true);
      }
    }
    if (skill.type === 'special') {
      if (skill.name === 'Méditation') {
        const newEnergy = Math.round(energy / 4 + currentEnergy);
        const finalEnergy = newEnergy > energy ? energy : newEnergy;
        setCurrentEnergy(finalEnergy);
        setBuffEnergy(true);
      }
      if (skill.name === 'Heal') {
        const newHealth = Math.round(health / 5 + currentHealth);
        const finalHealth = newHealth > health ? health : newHealth;
        setCurrentHealth(finalHealth);
        setBuffHealth(true);
      }
      if (skill.name === 'Rugissement du dragon') {
        setReduceDamage(true);
      }
    }
  };

  useEffect(() => {
    if (count !== 0) {
      if (reduceDamage) {
        const newDamage = Math.round(damage / 2);
        setCurrentHealth(currentHealth - newDamage);
      } else {
        setCurrentHealth(currentHealth - damage);
        resetDamage('');
      }
    }
  }, [damage]);

  useEffect(() => {
    if (currentEnergy <= 0 && currentEnergy !== '') {
      setNoEnergySkill(true);
    } else {
      setNoEnergySkill(false);
    }
  }, [currentEnergy]);

  return (
    <div className="fighter">
      {reduceDamage && <div className="buffDefense" />}
      {buffEnergy && <div className="buffEnergy" />}
      {buffHealth && <div className="buffHealth" />}
      <div className={cooldown ? 'turn-off' : ''} />
      <div className="fighter-name">
        <h2>{player.username}</h2>
      </div>
      <div className="fighter-image">
        <img
          src={
            player.npc === '0'
              ? `public/asset/playerImage/player-${player.picture}.png`
              : avatar
          }
          alt="le boxer"
        />
      </div>
      <div className="fighter-info">
        {!noEnergySkill && (
          <div className="fighter-info-skills">
            {skillsList.map((currentSkill) => {
              // Calcule les degats de la competence en fonction du niveau de force
              // ici chaque niveau attribut un bonus de 8% sur les degats
              let newSkillDamage = '';
              if (player.npc === true) {
                newSkillDamage = Math.ceil(
                  currentSkill.damage +
                    (currentSkill.damage * (parseInt(player.strength.id) * 8)) /
                      100
                );
              } else {
                newSkillDamage = Math.ceil(
                  currentSkill.damage +
                    (currentSkill.damage * (parseInt(player.strength_id) * 8)) /
                      100
                );
              }

              return (
                <div className={currentSkill.type} key={currentSkill.id}>
                  <div className="skill-icon">
                    <button
                      type="button"
                      label="skill"
                      className={currentSkill.icon}
                      onClick={() => {
                        if (!cooldown) {
                          setSkillLaunched(currentSkill);
                          setCount(count + 1);
                          setDamageDealt(newSkillDamage);
                          setCurrentEnergy(
                            currentEnergy - currentSkill.energyCost
                          );
                          handleBuff(currentSkill);
                          setIsBot(true);
                          setCooldown(true);
                        }
                        setTimeout(() => {
                          setCooldown(false);
                        }, 2500);
                      }}
                    />
                  </div>
                  <div className="Skill">
                    <div
                      style={{
                        width: `${newSkillDamage}%`,
                        minWidth: 'fit-content',
                      }}
                      className="Skill-damage"
                    >
                      {newSkillDamage}
                    </div>
                  </div>
                  <div className="Skill">
                    <div
                      style={{
                        width: `${currentSkill.energyCost}%`,
                        minWidth: 'fit-content',
                      }}
                      className="Skill-energy"
                    >
                      {currentSkill.energyCost}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {noEnergySkill && (
          <div>
            <div className="skill-icon-noEnergy">
              <button
                type="button"
                label="skill"
                className={NoEnergy.icon}
                onClick={() => {
                  if (!cooldown) {
                    setSkillLaunched(NoEnergy);
                    setCount(count + 1);
                    setDamageDealt(NoEnergy.damage);
                    setCurrentEnergy(currentEnergy + 10);
                    handleBuff(NoEnergy);
                    setIsBot(true);
                    setCooldown(true);
                  }
                  setTimeout(() => {
                    setCooldown(false);
                  }, 2500);
                }}
              />
            </div>
            <div className="Skills">
              <div
                style={{
                  width: `${NoEnergy.damage}%`,
                  minWidth: 'fit-content',
                }}
                className="Skills-damage"
              >
                {NoEnergy.damage}
              </div>
            </div>
            <div className="Skills">
              <div
                style={{
                  width: `${NoEnergy.energyCost * 2}%`,
                  minWidth: 'fit-content',
                }}
                className="Skills-energy"
              >
                {NoEnergy.energyCost}
              </div>
            </div>
          </div>
        )}
        <div className="fighter-info-stats">
          <div className="health-bar">
            <div
              className="health-fight"
              style={{ width: `${(currentHealth / health) * 100}%` }}
            >
              {currentHealth}
            </div>
          </div>
          <div className="energy-bar">
            <div
              className="energy-fight"
              style={{ width: `${(currentEnergy / energy) * 100}%` }}
            >
              {currentEnergy}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FighterFrame.propTypes = {};

export default FighterFrame;
