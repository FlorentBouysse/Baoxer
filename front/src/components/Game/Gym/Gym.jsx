/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Ability from './Ability/Ability';
import TrainingComponent from './TrainingComponent/TrainingComponent';
import Modal from '../Fight/Modal/Modal';
import './Gym.scss';

const Gym = ({
  currentTraining,
  setCurrentTraining,
  setBeginTimeTraining,
  setEndTimeTraining,
  endTimeTraining,
  setAmount,
}) => {
  const abilities = [
    {
      color: 'red',
      title: 'Force',
      icon: 'strength-icon',
      text: 'Soulevez des haltères plus lourds que votre dernière défaite et transformez votre tête de bao en une arme redoutable. Qui a dit que la puissance ne venait pas dans un emballage mignon ?',
      id: 1,
    },
    {
      color: 'yellow',
      title: 'Endurance',
      icon: 'energy-icon',
      text: 'Brûlez des calories, pas des rounds. Boostez votre énergie et soyez prêt à danser autour de vos adversaires sans jamais manquer de souffle. Un bon boxeur ne perd jamais son énergie, mais il peut perdre des calories.',
      id: 2,
    },
    {
      color: 'blue',
      title: 'Agilité',
      icon: 'agility-icon',
      text: "Enfilez vos gants de danse imaginaires et découvrez des mouvements aussi agiles qu'un bao en pleine évasion. Devenez le roi du ring avec des pirouettes qui laisseront vos adversaires perplexes.",
      id: 3,
    },
  ];
  const [isAbilityOpen, setIsAbilityOpen] = useState(false);
  const [currentAbilityOpen, setCurrentAbilityOpen] = useState('');
  const [launchTraining, setLaunchTraining] = useState('');
  const [trainingCssClass, setTrainingCssClass] = useState('');

  useEffect(() => {
    if (currentAbilityOpen === 'Force') {
      setTrainingCssClass('red');
    } else if (currentAbilityOpen === 'Endurance') {
      setTrainingCssClass('yellow');
    } else if (currentAbilityOpen === 'Agilité') {
      setTrainingCssClass('blue');
    }
  }, [currentAbilityOpen]);

  useEffect(() => {
    if (localStorage.getItem('endTimeTraining') === '') {
      if (launchTraining !== '') {
        const date1 = new Date();
        const dateLocal = date1.toLocaleString('fr-FR', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        });
        const launchTrainingMilliseconds = launchTraining * 60 * 60 * 1000;
        const dateWithLaunchTraining = new Date(
          date1.getTime() + launchTrainingMilliseconds
        );
        const dateWithLaunchTrainingLocal =
          dateWithLaunchTraining.toLocaleString('fr-FR', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          });
        setEndTimeTraining(dateWithLaunchTrainingLocal);
        setCurrentTraining(currentAbilityOpen);
        setBeginTimeTraining(dateLocal);
      }
    }
  }, [launchTraining]);

  return (
    <div className="gym">
      {!isAbilityOpen && (
        <div className="gym-container">
          {abilities.map((currentAbility) => {
            return (
              <Ability
                key={currentAbility.id}
                color={currentAbility.color}
                title={currentAbility.title}
                icon={currentAbility.icon}
                text={currentAbility.text}
                isOpen={setIsAbilityOpen}
                ability={setCurrentAbilityOpen}
              />
            );
          })}
        </div>
      )}
      {isAbilityOpen && (
        <div className="ability-container">
          <div className={`ability-container-content ${trainingCssClass}`}>
            <h2 className={trainingCssClass}>{currentAbilityOpen}</h2>
            <button
              type="button"
              className="close"
              label="close"
              onClick={() => {
                setIsAbilityOpen(false);
              }}
            >
              X
            </button>
            <div className="training">
              <div className={`training-headers ${trainingCssClass}`}>
                <h3 className={trainingCssClass}>Durée</h3>
                <h3 className={trainingCssClass}>Cout</h3>
                <h3 className={trainingCssClass}>Gains</h3>
                <h3 className={trainingCssClass}>Lancement</h3>
              </div>
              {localStorage.getItem('endTimeTraining') === '' && (
                <>
                  <TrainingComponent
                    length="0.005"
                    cost="10"
                    gain="60"
                    setter={setLaunchTraining}
                    className={trainingCssClass}
                    setAmount={setAmount}
                  />
                  <TrainingComponent
                    length="4"
                    cost="20"
                    gain="20"
                    setter={setLaunchTraining}
                    className={trainingCssClass}
                    setAmount={setAmount}
                  />
                  <TrainingComponent
                    length="8"
                    cost="30"
                    gain="50"
                    setter={setLaunchTraining}
                    className={trainingCssClass}
                    setAmount={setAmount}
                  />
                </>
              )}

              {endTimeTraining && (
                <div className="currentTraining">
                  <h2>
                    Un entraînement en <span>{currentTraining}</span> est déja
                    en cours
                  </h2>
                  <div className="timer-training">
                    <p className={currentAbilityOpen}>
                      Revenez à{' '}
                      <span>
                        {localStorage.getItem('endTimeTraining') !== ''
                          ? localStorage.getItem('endTimeTraining')
                          : endTimeTraining}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <Modal
        title="Bienvenu dans la salle d'entrainement Baoxeur"
        content="Choisis ton entrainement et la durée de ton entrainement afin de gagner de l'experience dans la statistique selectionnée et améliorer ton Baoxeur"
      />
    </div>
  );
};

Gym.propTypes = {};

export default Gym;
