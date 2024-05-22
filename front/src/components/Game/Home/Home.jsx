/* eslint-disable radix */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import HomeView from './HomeView/HomeView';
import Bedroom from './Bedroom/Bedroom';
import Computer from './Computer/Computer';
import Fridge from './Fridge/Fridge';
import Bodybuilding from './Bodybuilding/Bodybuilding';
import BodybuildingView from './Bodybuilding/View/BodybuildingView';
import Running from './Running/Running';
import Climbing from './Climbing/Climbing';
import Ability from '../Gym/Ability/Ability';

import './Home.scss';

const Home = ({ player, setInventory, updateBoxer }) => {
  const [isBed, setIsBed] = useState(false);
  const [isComputer, setIsComputer] = useState(false);
  const [isBodybuilding, setIsBodybuilding] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isClimbing, setIsClimbing] = useState(false);
  const [isFridge, setIsFridge] = useState(false);

  const bedTitle = 'Titre de la vue du lit';
  const bedContent = 'Titre de la vue du lit';

  const computerTitle = 'Titre de la vue de ordinateur';
  const computerContent = 'Titre de la vue de lordinateur';

  const subtitleBed = 'Faire dormir son boxeur';
  const subtitleComputer = 'Inscription au tournois';
  const subtitleMuscu = 'Gagnez instantanément 10% exp en Force 1/jour';
  const subtitleRun = 'Gagnez instantanément 10% exp en Endurance 1/jour';
  const subtitleClimb = 'Gagnez instantanément 10% exp en Agilité 1/jour';
  const subtitleFridge = 'Nourrir son boxeur';

  const handleExpUpDaily = (param) => {
    const date1 = new Date();
    const dateLocal = date1.toLocaleString('fr-FR', {
      day: 'numeric',
    });

    if (dateLocal !== localStorage.getItem('dayBonus')) {
      if (param === 'Musculation') {
        let newExp = parseInt(player.strength_experience) + 100;
        if (newExp >= 1000) {
          newExp -= 1000;
          const newLevel = parseInt(player.strength_id) + 1;
          updateBoxer({ strengthExperience: newExp, strength: newLevel });
        } else {
          updateBoxer({ strengthExperience: newExp });
        }
      } else if (param === 'Courir') {
        let newExp = parseInt(player.stamina_experience) + 100;
        if (newExp >= 1000) {
          newExp -= 1000;
          const newLevel = parseInt(player.stamina_id) + 1;
          updateBoxer({ staminaExperience: newExp, stamina: newLevel });
        } else {
          updateBoxer({ staminaExperience: newExp });
        }
      } else {
        let newExp = parseInt(player.agility_experience) + 100;
        if (newExp >= 1000) {
          newExp -= 1000;
          const newLevel = parseInt(player.agility_id) + 1;
          updateBoxer({ agilityExperience: newExp, agility: newLevel });
        } else {
          updateBoxer({ agilityExperience: newExp });
        }
      }
      localStorage.setItem('dayBonus', parseInt(dateLocal));
    }
  };

  const homeContentArray = [
    {
      color: 'red',
      title: 'Musculation',
      icon: 'musculation',
      text: subtitleMuscu,
    },
    {
      color: 'yellow',
      title: 'Courir',
      icon: 'courir',
      text: subtitleRun,
    },
    {
      color: 'blue',
      title: 'Escalader',
      icon: 'escalader',
      text: subtitleClimb,
    },
    {
      color: 'green',
      title: 'Lit',
      icon: 'lit',
      text: subtitleBed,
      isOpen: setIsBed,
    },
    {
      color: 'purple',
      title: 'Ordinateur',
      icon: 'ordinateur',
      text: subtitleComputer,
      isOpen: setIsComputer,
    },
    {
      color: 'orange',
      title: 'Frigo',
      icon: 'frigo',
      text: subtitleFridge,
      isOpen: setIsFridge,
    },
  ];

  useEffect(() => {
    const date1 = new Date();
    const dateLocal = date1.toLocaleString('fr-FR', {
      day: 'numeric',
    });
    if (dateLocal !== localStorage.getItem('dayBonus')) {
      localStorage.removeItem('dayBonus');
    }
  }, []);

  return (
    <div className="Home">
      {!isBed &&
        !isComputer &&
        !isBodybuilding &&
        !isRunning &&
        !isFridge &&
        !isClimbing && (
          <div className="Home-content">
            {homeContentArray.map((currentAbility) => {
              return (
                <Ability
                  key={currentAbility.color}
                  color={currentAbility.color}
                  title={currentAbility.title}
                  icon={currentAbility.icon}
                  text={currentAbility.text}
                  isOpen={currentAbility.isOpen}
                  handleExpUpDaily={handleExpUpDaily}
                  buttonTitle={'Choisir'}
                />
              );
            })}
          </div>
        )}
      {isBed && (
        <div className="isBed">
          <HomeView title={bedTitle} content={bedContent} close={setIsBed} />
          <Bedroom />
        </div>
      )}
      {isComputer && (
        <div className="isComputer">
          <HomeView
            title={computerTitle}
            content={computerContent}
            close={setIsComputer}
          />
          <Computer />
        </div>
      )}
      {isBodybuilding && (
        <div className="isBodybuilding">
          <BodybuildingView close={setIsBodybuilding} />
        </div>
      )}
      {isRunning && (
        <div className="isRunning">
          <Running close={setIsRunning} />
        </div>
      )}
      {isClimbing && (
        <div className="isClimbing">
          <Climbing close={setIsClimbing} />
        </div>
      )}
      {isFridge && (
        <div className="isFridge">
          <Fridge player={player} clear={setInventory} />
        </div>
      )}
    </div>
  );
};

Home.propTypes = {};

export default Home;
