/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Task from './Task/Task';
import './Work.scss';
import WorkingComponent from './WorkingComponent/WorkingComponent';
import Modal from '../Fight/Modal/Modal';

const Work = ({ player, updateBoxer }) => {
  const works = [
    {
      color: 'red',
      title: 'Mine',
      icon: 'strength-icon',
      text: "Creusez, cassez, et découvrez des trésors enfouis sous terre avec votre tête de bao. Chaque coup de pioche renforce vos muscles et met de l'argent dans votre poche.",
      id: 1,
    },
    {
      color: 'yellow',
      title: 'Bureau',
      icon: 'energy-icon',
      text: "Affrontez des piles de dossiers avec une agilité surprenante en tant que boxeur bao bun au bureau. Tapez sur ces touches de clavier avec une énergie débordante pour augmenter votre endurance. Plus de dossiers traités, plus d'argent gagné",
      id: 2,
    },
    {
      color: 'blue',
      title: 'Cuisine',
      icon: 'agility-icon',
      text: "Balancez-vous entre les casseroles et maniez les couteaux avec une précision digne d'un vrai chef ! Ce travail renforce votre agilité.",
      id: 3,
    },
  ];
  const [isAbilityOpen, setIsAbilityOpen] = useState(false);
  const [currentAbilityOpen, setCurrentAbilityOpen] = useState('');
  const [workingCssClass, setWorkingCssClass] = useState('');

  const [currentWorking, setCurrentWorking] = useState(false);
  const [endTimeWorking, setEndTimeWorking] = useState('');

  useEffect(() => {
    if (currentAbilityOpen === 'Mine') {
      setWorkingCssClass('red');
    } else if (currentAbilityOpen === 'Bureau') {
      setWorkingCssClass('yellow');
    } else if (currentAbilityOpen === 'Cuisine') {
      setWorkingCssClass('blue');
    }
  }, [currentAbilityOpen]);

  /*
  localStorage.setItem('beginTimeWorking', '');
  localStorage.setItem('currentWorking', '');
  localStorage.setItem('endTimeWorking', ''); 
  */

  const handleNewWork = (length) => {
    const date1 = new Date();
    const dateLocale = date1.toLocaleString('fr-FR', {
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });

    if (player.current_training === null || player.current_training === '') {
      const launchWorkingMilliseconds = length * 60 * 60 * 1000;
      const dateWithLaunchWorking = new Date(
        date1.getTime() + launchWorkingMilliseconds
      );
      const dateWithLaunchWorkingLocal = dateWithLaunchWorking.toLocaleString(
        'fr-FR',
        {
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }
      );
      setCurrentWorking(currentAbilityOpen);
      setEndTimeWorking(dateWithLaunchWorkingLocal);
      localStorage.setItem('currentWorking', currentAbilityOpen);
      localStorage.setItem('beginTimeWorking', dateLocale);
      localStorage.setItem('endTimeWorking', dateWithLaunchWorkingLocal);
      updateBoxer({
        CurrentTraining: currentAbilityOpen,
        trainingStart: dateLocale,
        trainingEnd: dateWithLaunchWorkingLocal,
      });
    }
    /*
      const dateDebut = new Date(`1970-01-01T${dateLocale}`);
      const dateFin = new Date(`1970-01-01T${dateWithLaunchWorkingLocal}`);
      const differenceEnMillisecondes = dateFin - dateDebut;
      const differenceDate = new Date(differenceEnMillisecondes);
      const differenceFormatee = differenceDate.toISOString().substr(11, 8);
      */
  };

  const handleEndWorking = () => {
    const date1 = new Date();
    const dateLocale = date1.toLocaleString('fr-FR', {
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
  };

  return (
    <div className="work">
      {!isAbilityOpen && (
        <div className="work-container">
          {works.map((currentWork) => {
            return (
              <Task
                key={currentWork.id}
                color={currentWork.color}
                title={currentWork.title}
                icon={currentWork.icon}
                text={currentWork.text}
                isOpen={setIsAbilityOpen}
                ability={setCurrentAbilityOpen}
              />
            );
          })}
        </div>
      )}
      {isAbilityOpen && (
        <div className="ability-container">
          <div className={`ability-container-content ${workingCssClass}`}>
            <h2 className={workingCssClass}>{currentAbilityOpen}</h2>
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
            <div className="working">
              <div className={`working-headers ${workingCssClass}`}>
                <h3 className={workingCssClass}>Durée</h3>
                <h3 className={workingCssClass}>Cout</h3>
                <h3 className={workingCssClass}>Expérience</h3>
                <h3 className={workingCssClass}>Argent</h3>
                <h3 className={workingCssClass}>Lancement</h3>
              </div>
              {localStorage.getItem('endTimeWorking') === '' && (
                <>
                  <WorkingComponent
                    length="0.002"
                    cost="10"
                    gain="50"
                    money="1500"
                    className={workingCssClass}
                    handleNewWork={handleNewWork}
                  />
                  <WorkingComponent
                    length="8"
                    cost="20"
                    gain="20"
                    money="300"
                    className={workingCssClass}
                    handleNewWork={handleNewWork}
                  />
                  <WorkingComponent
                    length="12"
                    cost="50"
                    gain="50"
                    money="800"
                    className={workingCssClass}
                    handleNewWork={handleNewWork}
                  />
                </>
              )}

              {endTimeWorking && (
                <div className="currentWorking">
                  <h2>
                    Vous travaillez déja en <span>{currentWorking}</span>
                  </h2>
                  <div className="timer-working">
                    <p className={currentAbilityOpen}>
                      Revenez à{' '}
                      <span>
                        {localStorage.getItem('endTimeWorking') !== ''
                          ? localStorage.getItem('endTimeWorking')
                          : endTimeWorking}
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
        title="Bienvenu dans la zone de travail Baoxeur"
        content="Choisis ton travail et la durée de ton entrainement afin de gagner de l'argent et ameliorer ton Baoxeur"
      />
    </div>
  );
};

Work.propTypes = {};

export default Work;
