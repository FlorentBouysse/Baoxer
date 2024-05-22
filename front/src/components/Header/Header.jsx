/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
// ---- Utils ---- //
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

// ---- Components ---- //

// ---- SCSS ---- //
import './Header.scss';

const Header = ({
  isConnected,
  setIsConnected,
  isDarkMod,
  setIsDarkMod,
  userName,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [cssDarkMod, setCssDarkMod] = useState(isDarkMod ? 'dark-mod' : '');
  const [cssDarkModGradient, setCssDarkModGradient] = useState(
    isDarkMod ? 'dark-mod-gradient' : ''
  );

  useEffect(() => {
    setCssDarkMod(isDarkMod ? 'dark-mod' : '');
    setCssDarkModGradient(isDarkMod ? 'dark-mod-gradient' : '');
  }, [isDarkMod]);

  return (
    <div className={`header-component ${cssDarkMod}`}>
      <div
        className={
          isMenuOpen ? `header ${cssDarkMod}` : `header-closed ${cssDarkMod}}`
        }
      >
        <img className="logo" src="public/asset/Logo.png" alt="logo" />

        <div className="header-links">
          <div className="theme-container">
            <button
              type="button"
              className="set-dark-mod"
              onClick={() => {
                setIsDarkMod(!isDarkMod);
                localStorage.setItem('darkMod', !isDarkMod);
              }}
            >
              Theme
            </button>
          </div>
          <NavLink className="link" activeclassname="active" to="/">
            Login
          </NavLink>
          <NavLink className="link" to="/classement">
            Classement
          </NavLink>
          <NavLink className="link" to="/condition-general-d-utilisation">
            CGU
          </NavLink>
          <NavLink className="link" to="/mise-a-jour">
            Mise à jour
          </NavLink>
          <NavLink className="link" to="/contact">
            Contact
          </NavLink>
          {isConnected && (
            <div className="user">
              <h3>
                Bienvenue <span>{userName}</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsConnected(false);
                  sessionStorage.removeItem('token');
                  localStorage.setItem('isLogged', false);
                  localStorage.removeItem('isInGame');
                  localStorage.removeItem('BoxerData');
                }}
              >
                Se déconnecter
              </button>
            </div>
          )}
        </div>
      </div>
      <button
        className="menu-burger"
        type="button"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        ||||
      </button>
    </div>
  );
};

export default Header;
