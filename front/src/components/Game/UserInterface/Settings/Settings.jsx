/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import './Settings.scss';

const Settings = ({ setGetGame }) => {
  return (
    <div className="settings-container">
      <h2>Paramètres</h2>
      <Link to="/">
        <button
          type="button"
          onClick={() => {
            setGetGame(false);
          }}
        >
          Retour accueil
        </button>
      </Link>
    </div>
  );
};

Settings.propTypes = {};

export default Settings;
