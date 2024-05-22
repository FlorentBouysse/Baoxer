/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import MapButton from '../MapButton/MapButton';
import Modal from './Fight/Modal/Modal';

// Scss
import './Game.scss';

const Game = ({ player }) => {
  return (
    <div className="game">
      <MapButton />
      <Modal
        title="Bienvenue !"
        content={`Ravis de te revoir ${player.username} ! Choisis ton activité.`}
      />
    </div>
  );
};

export default Game;
