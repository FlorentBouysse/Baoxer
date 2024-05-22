/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import './BoxerChoice.scss';
import { Link } from 'react-router-dom';

const BoxerChoice = ({ setNewUserPseudo, newUserPseudo, createBoxer }) => {
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [selected, setSelected] = useState(false);
  const avatar = [1, 2, 3, 4];

  return (
    <div className="boxer-choice">
      <div className="boxer-choice-container">
        <div className="boxer-choice-container-selection">
          <h2>Sélection du Boxer</h2>

          <div className="avatar">
            {avatar.map((currentPicture) => {
              return (
                <button
                  key={currentPicture}
                  className={`avatar-selection ${
                    selected === currentPicture ? 'selected' : ''
                  } image${currentPicture}`}
                  type="button"
                  onClick={() => {
                    setSelected(currentPicture);
                    setSelectedAvatar(currentPicture);
                    if (selected === currentPicture) {
                      setSelected('');
                      setSelectedAvatar('');
                    }
                  }}
                >
                  <img
                    src={`asset/playerImage/player-${currentPicture}.png`}
                    alt="choix avatar"
                    className="avatar-image"
                  />
                </button>
              );
            })}
          </div>
          <div className="boxer-choice-container-selection-info">
            <form>
              <div className="username-container">
                <label htmlFor="username">Pseudo</label>
                <input
                  type="text"
                  placeholder="Ton nom en jeu"
                  name="username"
                  className="input"
                  value={newUserPseudo}
                  onChange={(event) => {
                    setNewUserPseudo(event.target.value);
                  }}
                />
              </div>
              <div className="button-group">
                <Link to="/">
                  <button
                    className="create"
                    type="submit"
                    onClick={() => {
                      createBoxer(selectedAvatar, newUserPseudo);
                    }}
                  >
                    Créer
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxerChoice;
