/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Welcome.scss';

const Welcome = ({ cssDarkModGradient, isPasswordForget }) => {
  const [cssClass, setCssClass] = useState('');
  useEffect(() => {
    if (isPasswordForget) {
      setCssClass('modal-on');
    } else {
      setCssClass('');
    }
  }, [isPasswordForget]);

  return (
    <div className={`Welcome ${cssClass} ${cssDarkModGradient}`}>
      <div className="Welcome-main">
        <h1>Bienvenue sur Baoxing !</h1>
        <p>
          Découvrez un univers unique où la puissance, l'endurance et l'agilité
          se mélangent dans une aventure palpitante. Incarnez votre héro
          improbable, un boxeur au courage infini et à la tête de bao bun qui se
          lance dans des défis épiques.
        </p>
      </div>
      <div className="main-content">
        <div className="Welcome-element">
          <h2>🥊 Entraînez votre Baoxeur 🥊</h2>
          <p>
            Boostez vos compétences en explorant la salle d'entraînement.
            Devenez plus fort, plus résistant, et plus agile pour relever les
            défis qui vous attendent.
          </p>
        </div>
        <div className="Welcome-element">
          <h2>💼 Carrières amusantes et lucratives 💼</h2>
          <p>
            Choisissez votre destinée! Creusez des trésors à la mine, jonglez
            avec des dossiers au bureau, ou affinez votre agilité dans la
            cuisine. Chaque emploi apporte des récompenses uniques pour affûter
            vos compétences et remplir votre porte-monnaie.
          </p>
        </div>
        <div className="Welcome-element">
          <h2>🎮 Participez à des quêtes 🎮 passionnantes</h2>
          <p>
            Plongez dans des quêtes palpitantes, affrontez des adversaires
            redoutables, et découvrez des mondes étonnants. Votre Baoxeur est
            prêt à relever tous les défis!
          </p>
        </div>
        <div className="Welcome-element">
          <h2>🏆 Devenez le champion ultime 🏆</h2>
          <p>
            Plongez dans l'excitation des compétitions hebdomadaires en
            affrontant des adversaires contrôlés par l'IA lors de nos tournois !
            Êtes-vous prêt à affirmer votre suprématie chaque semaine dans
            l'arène ?
          </p>
        </div>
      </div>
    </div>
  );
};

Welcome.propTypes = {};

export default Welcome;
