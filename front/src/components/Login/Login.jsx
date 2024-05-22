/* eslint-disable no-unneeded-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { ArrowLeft, Check, Eye } from 'react-feather';
import { Link } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import './Login.scss';

const Login = ({
  userEmail,
  setUserEmail,
  userPassword,
  setUserPassword,
  isLogged,
  login,
  isDarkMod,
  loginFail,
  setLoginFail,
  setGetGame,
  setNewUserEmail,
  newUserEmail,
  setNewUserPassword,
  newUserPassword,
  createUser,
  isAdmin,
}) => {
  const [isNew, setIsNew] = useState(false);
  const [isPasswordForget, setIsPasswordForget] = useState(false);
  const [isSmall, setIsSmall] = useState(window.innerWidth <= 850);
  const [cssDarkMod, setCssDarkMod] = useState(isDarkMod ? 'dark-mod' : '');
  const [cssDarkModGradient, setCssDarkModGradient] = useState(
    isDarkMod ? 'dark-mod-gradient' : ''
  );
  const [isWrong, setIsWrong] = useState(false);
  const [transition, setTransition] = useState(false);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setCssDarkMod(isDarkMod ? 'dark-mod' : '');
    setCssDarkModGradient(isDarkMod ? 'dark-mod-gradient' : '');
  }, [isDarkMod]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth <= 850);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (loginFail) {
      setTimeout(() => {
        setLoginFail(false);
      }, 3000);
    }
    if (isWrong) {
      setTimeout(() => {
        setIsWrong(false);
      }, 2000);
    }
  }, [loginFail, isWrong]);

  return (
    <div className="login">
      {isPasswordForget && (
        <div className="modal-password">
          <button
            label="close"
            className="close-modal"
            onClick={(event) => {
              event.preventDefault();
              setIsPasswordForget(false);
            }}
            type="submit"
          >
            X
          </button>
          <h3>
            Veuillez saisir votre e-mail. Un mail de récupération vous seras
            envoyé
          </h3>
          <form action="" method="post">
            <p>
              <label htmlFor="email">Email</label>
              <br />
              <input type="email" id="email" placeholder="Votre E-mail" />
            </p>
            <p>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  setIsPasswordForget(false);
                }}
                type="submit"
              >
                Valider
              </button>
            </p>
          </form>
        </div>
      )}
      <div
        className={
          isPasswordForget ? 'login-container modal-on' : 'login-container'
        }
      >
        {!isSmall && (
          <div className={`login-container-player ${cssDarkModGradient}`}>
            <h2 className="presentation">Présentation</h2>
            <iframe
              width="100%"
              className="iframe"
              height="100%"
              src="https://www.youtube.com/embed/y46JplIL5cE?si=E7u4gPaX7ovQ0MZvy"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        )}
        {!isNew && !isLogged && (
          <div className={`login-container-form ${cssDarkModGradient} `}>
            <form
              action=""
              method="post"
              className={`login-form ${transition ? 'transition' : ''}`}
              onSubmit={(event) => {
                event.preventDefault();
                login();
              }}
            >
              <label htmlFor="username">Identifiant</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Pseudo / E-mail"
                value={userEmail}
                onChange={(event) => {
                  setUserEmail(event.target.value);
                }}
              />
              {loginFail && <small>Identifiants incorrect</small>}
              <label htmlFor="password">Mot de passe</label>
              <input
                type={isShown ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Mot de passe"
                className="password"
                value={userPassword}
                onChange={(event) => {
                  setUserPassword(event.target.value);
                }}
                onSubmit={() => {
                  login();
                }}
              />
              <Eye
                className={`eye ${isShown ? 'white' : 'black'}`}
                onClick={() => {
                  setIsShown(!isShown);
                }}
              />
              <button
                type="button"
                className="password-forget"
                onClick={() => {
                  setIsPasswordForget(true);
                }}
              >
                Mot de passe oublié ?
              </button>
              <div className="remember">
                <label htmlFor="remember-user">Se souvenir de moi ?</label>
                <input
                  className="remember-user-input"
                  type="checkbox"
                  name="remember-user"
                />
              </div>
              <div className="button-group">
                <button
                  className="submit-login"
                  type="button"
                  onClick={(event) => {
                    if (
                      userEmail.includes('<') ||
                      userEmail.includes('>') ||
                      userPassword.includes('<') ||
                      userPassword.includes('>')
                    ) {
                      event.preventDefault();
                    } else {
                      login();
                    }
                  }}
                >
                  Connexion
                </button>
                <button
                  className="submit-signin"
                  type="button"
                  onClick={(event) => {
                    setTransition(true);
                    setTimeout(() => {
                      setTransition(false);
                      event.preventDefault();
                      setIsNew(true);
                    }, 400);
                  }}
                >
                  S'inscrire
                </button>
              </div>
            </form>
            <img
              className={`logo ${transition ? 'transitionImage' : ''}`}
              src="public/asset/Logo.png"
              alt="logo"
            />
          </div>
        )}
        {isLogged && (
          <div className={`login-container-form ${cssDarkModGradient}`}>
            <img className="logo" src="public/asset/Logo.png" alt="logo" />
            <div className="link-container">
              <Link className="go-link" to="/jeu">
                <button
                  className="go"
                  type="submit"
                  onClick={() => {
                    if (
                      localStorage.getItem('isLogged') === 'true' &&
                      isLogged
                    ) {
                      setGetGame(true);
                    }
                  }}
                >
                  Go !
                </button>
              </Link>
              {isAdmin && (
                <Link
                  className="go-link"
                  to="http://florentbouysse-server.eddi.cloud/baoxing/public/back/"
                >
                  <button className="go" type="submit">
                    Back Office
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
        {isNew && (
          <div className={`login-container-form ${cssDarkModGradient}`}>
            <img
              className={`logo ${transition ? 'transitionImage' : ''}`}
              src="public/asset/Logo.png"
              alt="logo"
            />
            <form
              method="post"
              action=""
              className={`login-form ${transition ? 'transitionBack' : ''}`}
            >
              <label htmlFor="email">E-mail</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Renseignez votre e-mail"
                value={newUserEmail}
                onChange={(event) => {
                  setNewUserEmail(event.target.value);
                }}
              />
              <label htmlFor="password">Mot de passe</label>
              <div className={`regex ${isWrong ? 'wrong' : ''}`}>
                <p className="regex-head">Votre mot de passe doit contenir :</p>
                <ul className="regex-list">
                  <li>- 10 caractères</li>
                  <li>- 1 lettre majuscule</li>
                  <li>- 1 chiffre</li>
                  <li>- 1 caractère spécial</li>
                </ul>
              </div>

              <input
                type={isShown ? 'text' : 'password'}
                id="password"
                name="password"
                className="password"
                placeholder={`I-love-ba0 \u2713`}
                value={newUserPassword}
                onChange={(event) => {
                  setNewUserPassword(event.target.value);
                }}
              />
              <Eye
                className={`eyeNew ${isShown ? 'white' : 'black'}`}
                onClick={() => {
                  setIsShown(!isShown);
                }}
              />
              <div className="button-group">
                <Link to="/creation-boxer">
                  <button
                    className="submit-signin-new"
                    type="submit"
                    onClick={(event) => {
                      const passwordRegex =
                        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{10,}$/;
                      if (passwordRegex.test(newUserPassword)) {
                        setIsNew(false);
                        createUser();
                      } else {
                        event.preventDefault();
                        setIsWrong(true);
                      }
                    }}
                  >
                    Créer mon compte !
                  </button>
                </Link>
              </div>
              <button
                type="button"
                className="return-login"
                onClick={(event) => {
                  setTransition(true);
                  setTimeout(() => {
                    setTransition(false);
                    event.preventDefault();
                    setIsNew(false);
                  }, 400);
                }}
              >
                <ArrowLeft />
              </button>
            </form>
          </div>
        )}
      </div>
      <Welcome
        cssDarkModGradient={cssDarkModGradient}
        isPasswordForget={isPasswordForget}
      />
      {isSmall && (
        <div className="login-container-player">
          <h2>Présentation</h2>
          <iframe
            width="100%"
            className="iframe"
            height="100%"
            src="https://www.youtube.com/embed/y46JplIL5cE?si=E7u4gPaX7ovQ0MZv"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

Login.propTypes = {};

export default Login;
