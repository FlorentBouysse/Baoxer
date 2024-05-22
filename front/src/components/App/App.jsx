/* eslint-disable prettier/prettier */
/* eslint-disable yoda */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable radix */
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../Header/Header';
import Login from '../Login/Login';
import BoxerChoice from '../BoxerChoice/BoxerChoice';
import Ranking from '../Ranking/Ranking';
import Cgu from '../Cgu/Cgu';
import Update from '../Update/Update';
import Error from '../Error/Error';
import Contact from '../Contact/Contact';
import Game from '../Game/Game';
import Home from '../Game/Home/Home';
import Fight from '../Game/Fight/Fight';
import Market from '../Game/Market/Market';
import Tournament from '../Game/Tournament/Tournament';
import Work from '../Game/Work/Work';
import Gym from '../Game/Gym/Gym';
import SkillsSelection from '../Game/Fight/SkillsSelection/SkillsSelection';
import SkillsSelectionTournament from '../Game/Tournament/SkillsSelection/SkillsSelection';
import FightStartTounament from '../Game/Tournament/FightStart/FightStart';
import FightStart from '../Game/Fight/FightStart/FightStart';
import UserInterface from '../Game/UserInterface/UserInterface';
import Notification from '../Game/Notification/Notification';

import './App.scss';

function App() {
  // --------------------- STATE --------------------- //
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isDarkMod, setIsDarkMod] = useState(localStorage.getItem('darkMod'));
  const [loginFail, setLoginFail] = useState(false);
  const [rankingPlayer, setRankingPlayer] = useState(
    JSON.parse(localStorage.getItem('rankingPlayers'))
  );

  // --------------------- STATE-LOGIN --------------------- //

  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));
  const [userPassword, setUserPassword] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [userName, setUserName] = useState(
    localStorage.getItem('userName') !== ''
  );
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem('isLogged') === 'true'
  );
  const [getGame, setGetGame] = useState(
    localStorage.getItem('isInGame') === 'true'
  );
  const [userToken, setUserToken] = useState(sessionStorage.getItem('token'));

  // --------------------- STATE-NEW-USER --------------------- //

  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserAvatar, setNewUserAvatar] = useState('');
  const [newUserPseudo, setNewUserPseudo] = useState('');
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem('isAdmin' === true)
  );
  const [newUserId, setNewUserId] = useState('');

  // --------------------- STATE-NPC --------------------- //

  const [npcsList, setNpcsList] = useState(
    JSON.parse(localStorage.getItem('npcsList'))
  );
  const [currentNpc, setCurrentNpc] = useState('');
  const [npc, setNpc] = useState(
    JSON.parse(localStorage.getItem('npc' !== undefined))
  );
  const [npcSkills, setNpcSkills] = useState(
    JSON.parse(localStorage.getItem('npcSkills'))
  );

  // ---------- STATE-MARKET-ITEMS ---------- //
  const [marketItems, setMarketItems] = useState([]);

  // ---------- STATE-PLAYER ---------- //

  const [selectedSkill, setSelectedSkill] = useState([]);
  const [playerInfo, setPlayerInfo] = useState(
    JSON.parse(localStorage.getItem('BoxerData') !== '')
  );
  const [amount, setAmount] = useState('');
  const [isNewLevel, setIsNewLevel] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [skillsList, setSkillsList] = useState('');

  // --------------------- Training Player --------------------- //
  const [currentTraining, setCurrentTraining] = useState('');
  const [beginTimeTraining, setBeginTimeTraining] = useState('');
  const [endTimeTraining, setEndTimeTraining] = useState('');
  const [isTrainingDone, setIsTrainingDone] = useState(false);
  const [isFightDone, setIsFightDone] = useState(false);

  // --------------------- AXIOS --------------------- //

  /**
   * Update current npc
   * @param {*} number indicate id of the new npc
   */
  const getNpc = (number) => {
    setNpc(npcsList[number]);
    const npcTemp = JSON.stringify(npcsList[number]);
    localStorage.setItem('npc', npcTemp);
    setNpcSkills(npcsList[number].skills);
    const npcSkillstemp = JSON.stringify(npcsList[number].skills);
    localStorage.setItem('npcSkills', npcSkillstemp);
  };

  /**
   * React when npc is updated, set npc skills
   */
  useEffect(() => {
    /*
    if (npc !== '' && isLogged && npcsList.lenght > 0) {
      setNpcSkills(npc.skills);
      const npcSkillstemp = JSON.stringify(npc.skills);
      localStorage.setItem('npcSkills', npcSkillstemp);
    }
    */
  }, [npc, npcsList, skillsList]);

  const getMarketItems = async (token) => {
    try {
      const response = await axios.get(
        `https://florentbouysse-server.eddi.cloud/baoxing/public/api/item`,
        {
          headers: {
            Authorization: `Bearer ${token || userToken}`,
          },
        }
      );
      const marketItemsArray = response.data;
      setMarketItems(marketItemsArray);
      localStorage.setItem('marketItemsList', JSON.stringify(marketItemsArray));
    } catch (error) {
      //
    }
  };

  /**
   * Get all npcs
   * @param {*} token
   */
  const getNpcs = async (token) => {
    try {
      const response = await axios.get(
        `https://florentbouysse-server.eddi.cloud/baoxing/public/api/boxer`,
        {
          headers: {
            Authorization: `Bearer ${token || userToken}`,
          },
        }
      );
      const npcsListResponse = response.data.filter(
        (currentBoxer) => currentBoxer.npc === true
      );
      setNpcsList(npcsListResponse);
      const npcsListJSON = JSON.stringify(npcsListResponse);
      localStorage.setItem('npcsList', npcsListJSON);
    } catch (error) {
      //
    }
  };

  /**
   * Get all skills
   * @param {*} token
   */
  const getSkills = async (token) => {
    try {
      const response = await axios.get(
        `https://florentbouysse-server.eddi.cloud/baoxing/public/api/skill/`,
        {
          headers: {
            Authorization: `Bearer ${token || userToken}`,
          },
        }
      );
      setSkillsList(response.data);
    } catch (error) {
      //
    }
  };

  /**
   * get all players and set data in state to update ranking view
   * @param {string} token
   */
  const getPlayerForRanking = async (token) => {
    try {
      const response = await axios.get(
        `https://florentbouysse-server.eddi.cloud/baoxing/public/api/boxer/`,
        {
          headers: {
            Authorization: `Bearer ${token || userToken}`,
          },
        }
      );
      setRankingPlayer(response.data);
      const rankingPlayers = JSON.stringify(response.data);
      localStorage.setItem('rankingPlayers', rankingPlayers);
    } catch (error) {
      //
    }
  };

  /**
   * Update player progression in tournament
   * @param {int} id boxer id
   * @param {string} token
   * @param {int} tournamentId the tournament won by player
   */
  const updateTournament = async (id, token, tournamentId) => {
    try {
      const response = await axios.put(
        `https://florentbouysse-server.eddi.cloud/baoxing/public/api/boxer/update/${userId}/addtournament`,
        {
          tournament: tournamentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token || userToken}`,
          },
        }
      );
    } catch (error) {
      //
    }
  };

  /**
   * get progression in tournament
   * @param {int} id boxer id
   */
  const getTournamentProgression = async (id) => {
    try {
      const response = await axios.get(
        `https://florentbouysse-server.eddi.cloud/baoxing/public/api/boxer/show/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      updateTournament(
        parseInt(playerInfo.id),
        userToken,
        response.data.tournament.length + 1
      );
    } catch (error) {
      //
    }
  };

  /**
   * Get user with his email and token
   * @param {*} email
   * @param {*} token
   * @returns Register in state and localStorage response
   */
  const getUser = async (email, token) => {
    try {
      const response = await axios.get(
        `https://florentbouysse-server.eddi.cloud/baoxing/public/api/user/email/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserName(response.data[1].username);
      localStorage.setItem('userName', response.data[1].username);
      localStorage.setItem('BoxerData', JSON.stringify(response.data[1]));
      localStorage.setItem('userId', response.data[1].id);
      localStorage.setItem('userEmail', response.data[0].email);
      localStorage.setItem('currentNpc', parseInt(response.data[1].win));
      const parsedBoxerData = response.data[1];
      setPlayerInfo(parsedBoxerData);
      setIsDarkMod(localStorage.getItem('darkMod'));
      setUserId(parseInt(response.data[1].id));

      if (response.data[1].win === null) {
        setCurrentNpc(0);
        localStorage.setItem('currentNpc', 0);
      } else {
        setCurrentNpc(parseInt(response.data[1].win));
        localStorage.setItem('currentNpc', parseInt(response.data[1].win));
      }
      const role = response.data[0].roles;
      if (role.includes('ROLE_ADMIN')) {
        setIsAdmin(true);
        localStorage.setItem('isAdmin', true);
      } else {
        localStorage.setItem('isAdmin', false);
        setIsAdmin(false);
      }

      await getSkills(token);
      await getMarketItems(token);
      await getNpcs(token);
      await getPlayerForRanking(token);
      await getNpc(response.data[1].win === null ? 0 : response.data[1].win);
    } catch (error) {
      //
    }
  };

  /**
   * Get id of the new user to link it with his boxer
   * @param {string} email new user email
   * @param {string} token temporary token
   */
  const getNewUser = async (email, token) => {
    try {
      const response = await axios.get(
        `https://florentbouysse-server.eddi.cloud/baoxing/public/api/user/email/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        setNewUserId(response.data[0].id);
      }
    } catch (error) {
      //
    }
  };

  /**
   * Create and associate new boxer for new user
   * @param {int} avatar number of the avatar selected by user
   * @param {string} pseudo new user username
   */
  const createNewBoxer = (avatar, pseudo) => {
    axios
      .post(
        'https://florentbouysse-server.eddi.cloud/baoxing/public/api/boxer/create',
        {
          agility: 1,
          stamina: 1,
          strength: 1,
          picture: avatar,
          username: pseudo,
          level: 1,
          npc: 0,
          user: newUserId,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        setLoginFail(true);
      });
  };

  /**
   * Update boxer in database
   * to use :
   * updateBoxer({ level: 5, agility: 3, currentEnergy: 75 });
   * @param {Object} updateOptions
   */
  const updateBoxer = (updateOptions) => {
    const updateData = {
      level:
        updateOptions.level !== undefined
          ? updateOptions.level
          : playerInfo.level_id,

      levelExperience:
        updateOptions.levelExperience !== undefined
          ? updateOptions.levelExperience
          : playerInfo.level_experience,

      agility:
        updateOptions.agility !== undefined
          ? updateOptions.agility
          : playerInfo.agility_id,

      agilityExperience:
        updateOptions.agilityExperience !== undefined
          ? updateOptions.agilityExperience
          : playerInfo.agility_experience,

      strength:
        updateOptions.strength !== undefined
          ? updateOptions.strength
          : playerInfo.strength_id,

      strengthExperience:
        updateOptions.strengthExperience !== undefined
          ? updateOptions.strengthExperience
          : playerInfo.strength_experience,

      stamina:
        updateOptions.stamina !== undefined
          ? updateOptions.stamina
          : playerInfo.stamina_id,

      staminaExperience:
        updateOptions.staminaExperience !== undefined
          ? updateOptions.staminaExperience
          : playerInfo.stamina_experience,

      health: 100,

      trainingStart:
        updateOptions.trainingStart !== undefined
          ? updateOptions.trainingStart
          : playerInfo.training_start,

      trainingEnd:
        updateOptions.trainingEnd !== undefined
          ? updateOptions.trainingEnd
          : playerInfo.training_end,

      CurrentTraining:
        updateOptions.CurrentTraining !== undefined
          ? updateOptions.CurrentTraining
          : playerInfo.current_training,

      energy: 100,

      currentEnergy:
        updateOptions.currentEnergy !== undefined
          ? updateOptions.currentEnergy
          : playerInfo.current_energy,

      win: updateOptions.win !== undefined ? updateOptions.win : playerInfo.win,

      loose:
        updateOptions.loose !== undefined
          ? updateOptions.loose
          : playerInfo.loose,

      availableStatsPoints:
        updateOptions.availableStatsPoints !== undefined
          ? updateOptions.availableStatsPoints
          : playerInfo.available_stats_points,

      money:
        updateOptions.money !== undefined
          ? updateOptions.money
          : playerInfo.money,
    };

    axios
      .put(
        `https://florentbouysse-server.eddi.cloud/baoxing/public/api/boxer/update/${userId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((response) => {
        getUser(userEmail, userToken);
      })
      .catch((error) => {
        //
      });
  };

  /**
   * Get id to create new boxer
   */
  const fakeLogin = async () => {
    try {
      const response = await axios.post(
        'https://florentbouysse-server.eddi.cloud/baoxing/public/api/login_check',
        {
          username: newUserEmail,
          password: newUserPassword,
        }
      );
      if (response) {
        setUserToken(response.data.token);
        getNewUser(newUserEmail, response.data.token);
      }
    } catch (error) {
      //
    }
  };

  /**
   * Create new user whith temporary token
   * @param {string} tempToken Creation token
   */
  const createUser = async () => {
    try {
      const response = await axios.post(
        'https://florentbouysse-server.eddi.cloud/baoxing/public/api/user/create',
        {
          email: newUserEmail,
          password: newUserPassword,
        }
      );
      if (response) {
        await fakeLogin();
      }
    } catch (error) {
      //
      setLoginFail(true);
    }
  };

  /**
   * Login when user already have account
   */
  const login = async () => {
    try {
      const response = await axios.post(
        'https://florentbouysse-server.eddi.cloud/baoxing/public/api/login_check',
        {
          username: userEmail,
          password: userPassword,
        }
      );
      if (response.data.token) {
        const newToken = response.data.token;
        if (sessionStorage.getItem('token') !== newToken) {
          sessionStorage.setItem('token', newToken);
        }
        localStorage.setItem('isLogged', true);
        localStorage.setItem('userEmail', userEmail);
        setIsLogged(true);
        setUserToken(newToken);
        await getUser(userEmail, newToken);
      }
    } catch (error) {
      setLoginFail(true);
      //
    }
  };

  // --------------------- FUNCTIONS --------------------- //

  /**
   * OnLoad , set from localstorage state of the user if exist
   */
  useEffect(() => {
    const savedTraining = localStorage.getItem('currentTraining');
    const savedBeginTimeTraining = localStorage.getItem('beginTimeTraining');
    const savedEndTimeTraining = localStorage.getItem('endTimeTraining');
    const savedNpcProgression = localStorage.getItem('currentNpc');
    const savedUserName = localStorage.getItem('userName');
    const savedBoxer = JSON.parse(localStorage.getItem('BoxerData')) || [];
    const savedDarkMod = localStorage.getItem('darkMod');
    const savedIsAdmin = localStorage.getItem('isAdmin' === true);

    if (savedIsAdmin) setIsAdmin(savedIsAdmin);
    if (savedDarkMod) setPlayerInfo(savedDarkMod);
    if (savedBoxer) setPlayerInfo(savedBoxer);
    if (savedUserName) setUserName(savedUserName);
    if (savedNpcProgression) setCurrentNpc(currentNpc);
    if (savedTraining) setCurrentTraining(savedTraining);
    if (savedBeginTimeTraining) setBeginTimeTraining(savedBeginTimeTraining);
    if (savedEndTimeTraining) setEndTimeTraining(savedEndTimeTraining);
  }, []);

  /**
   * Function that calculate and update stat experience amount
   * @param {int} stat the current experience amount in a stat
   * @returns new amount , if level up or just increase
   */
  const handleNewExp = (stat) => {
    const amountInt = parseInt(amount);
    const maxExperience = 1000;
    const stats = (amountInt * maxExperience) / 100;
    let newExperience = stat;

    if (stat + stats >= 1000) {
      const newLevelExp = stat + stats - 1000;
      setIsNewLevel(true);
      newExperience = 0 + newLevelExp;
      return newExperience;
    }
    newExperience += stats;
    return newExperience;
  };

  /**
   * Function that handle rewards when training's done
   * verify the current training
   * check actual exp , verifiy if level up or not and apply new experience
   * Also update in back new values
   */
  const handleEndTraining = () => {
    if (currentTraining === 'Force') {
      const actualExp = parseInt(playerInfo.strength_experience);
      playerInfo.strength_experience = handleNewExp(
        parseInt(playerInfo.strength_experience)
      );
      const newStrengthExperience = parseInt(playerInfo.strength_experience);
      // if level up => exp up and level up
      if (actualExp > newStrengthExperience) {
        const newStrengthLevel = parseInt(playerInfo.strength_id) + 1;
        playerInfo.strength_id = newStrengthLevel;
        setIsNewLevel(false);
        updateBoxer({
          strength: newStrengthLevel,
          strengthExperience: newStrengthExperience,
        });
        // else, just exp up
      } else {
        updateBoxer({ strengthExperience: newStrengthExperience });
      }
    } else if (currentTraining === 'Agilité') {
      const actualExp = parseInt(playerInfo.agility_experience);
      playerInfo.agility_experience = handleNewExp(
        parseInt(playerInfo.agility_experience)
      );
      const newAgilityExperience = parseInt(playerInfo.agility_experience);
      updateBoxer({ agilityExperience: newAgilityExperience });
      if (actualExp > newAgilityExperience) {
        const newAgilityLevel = parseInt(playerInfo.agility_id) + 1;
        playerInfo.agility_id = newAgilityLevel;
        setIsNewLevel(false);
        updateBoxer({
          agility: newAgilityLevel,
          agilityExperience: newAgilityExperience,
        });
      }
    } else {
      const actualExp = parseInt(playerInfo.stamina_experience);
      playerInfo.stamina_experience = handleNewExp(
        parseInt(playerInfo.stamina_experience)
      );
      const newStaminaExperience = parseInt(playerInfo.stamina_experience);
      updateBoxer({
        staminaExperience: newStaminaExperience,
      });
      if (
        actualExp > newStaminaExperience ||
        actualExp === newStaminaExperience
      ) {
        const newStaminaLevel = parseInt(playerInfo.stamina_id) + 1;
        playerInfo.stamina_id = newStaminaLevel;
        setIsNewLevel(false);
        updateBoxer({
          stamina: newStaminaLevel,
          staminaExperience: newStaminaExperience,
        });
      }
    }
  };

  /**
   * Update localStorage when state of isLogged and getGame are updated
   */
  useEffect(() => {
    localStorage.setItem('isLogged', isLogged.toString());
    localStorage.setItem('isInGame', getGame.toString());
  }, [isLogged, getGame]);

  /**
   * Verify every second if training is complete
   * If endTimeTraining done :
   * reset training , apply rewards ,
   * display notification for 15 seconds and update in back
   */
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().toLocaleString('fr-FR', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });

      if (endTimeTraining && currentTime > endTimeTraining) {
        setNotificationMessage(
          "Votre entraînement est terminé ! Rendez-vous dans la salle d'entraînement pour récupérer votre récompense"
        );
        handleEndTraining();
        setCurrentTraining('');
        setBeginTimeTraining('');
        setEndTimeTraining('');
        setIsTrainingDone(true);
        localStorage.setItem('currentTraining', '');
        localStorage.setItem('beginTimeTraining', '');
        localStorage.setItem('endTimeTraining', '');
        updateBoxer({});

        setTimeout(() => {
          setNotificationMessage('');
          setIsTrainingDone(false);
        }, 15000);

        clearInterval(intervalId);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [endTimeTraining]);

  useEffect(() => {
    const storedMarketItems = localStorage.getItem('marketItemsList');
    if (storedMarketItems) {
      try {
        const parsedMarketItems = JSON.parse(storedMarketItems);
        setMarketItems(parsedMarketItems);
      } catch (error) {
        //
      }
    }
  }, []);

  /**
   * If notification shown , hidde after 10 seconds
   */
  useEffect(() => {
    if (notificationMessage.length > 0) {
      setTimeout(() => {
        setNotificationMessage('');
      }, 10000);
    }
  }, [notificationMessage]);

  /**
   * Update localStorage when state of currentTraining, beginTimeTraining and
   * endTimeTraining are updated
   */
  useEffect(() => {
    localStorage.setItem('currentTraining', currentTraining);
    localStorage.setItem('beginTimeTraining', beginTimeTraining);
    localStorage.setItem('endTimeTraining', endTimeTraining);
  }, [currentTraining, beginTimeTraining, endTimeTraining]);

  /**
   * Update localStorage when state of currentNpc is updated
   */
  useEffect(() => {
    localStorage.setItem('currentNpc', currentNpc);
  }, [currentNpc]);

  /**
   * if currentNpc > playerInfo.win mean player won a fight
   * in this case update playerInfo by adding 100$ , 200 exp
   * Also verify if exp up conduct to level up and handle level up
   */
  const handleFightWin = (tournament) => {
    let cash = 100;
    let exp = 200;
    if (tournament) {
      cash = 500;
      exp = 1000;
      getTournamentProgression(parseInt(playerInfo.id));
    }

    setIsFightDone(true);

    setTimeout(() => {
      setIsFightDone(false);
    }, 7000);

    setPlayerInfo((prevPlayerInfo) => {
      const newMoney = parseInt(playerInfo.money) + cash;
      const newWin = playerInfo.win === null ? 1 : parseInt(playerInfo.win) + 1;

      if (parseInt(prevPlayerInfo.level_experience) + exp >= 1000) {
        const newExp = parseInt(prevPlayerInfo.level_experience) + exp - 1000;

        const newLevel = parseInt(prevPlayerInfo.level_id) + 1;
        const newAvailableStatsPoint =
          parseInt(prevPlayerInfo.available_stats_points) + 3;
        updateBoxer({
          level: newLevel,
          levelExperience: newExp,
          availableStatsPoints: newAvailableStatsPoint,
          money: newMoney,
          win: newWin,
        });
        return {
          ...prevPlayerInfo,
          level_experience: newExp,
          level: newLevel,
          available_stats_points: newAvailableStatsPoint,
          money: newMoney,
          win: newWin,
        };
      }
      const newExp = parseInt(prevPlayerInfo.level_experience) + exp;
      updateBoxer({
        levelExperience: newExp,
        money: newMoney,
        win: newWin,
      });
      return {
        ...prevPlayerInfo,
        level_experience: newExp,
        money: newMoney,
        win: newWin,
      };
    });
  };

  /**
   * Update player inventory on change
   */
  useEffect(() => {
    if (inventory.length !== 0) {
      playerInfo.inventory = [...playerInfo.inventory, inventory];
      playerInfo.money -= inventory.itemPrice;
      updateBoxer({ money: inventory.itemPrice });
    }
  }, [inventory, playerInfo]);

  /**
   * Handle new stats point level set by player on each stats
   * Update on dataBase
   * @param {int} strengthPoint Stats points set on strength level
   * @param {int} staminaPoint Stats points set on stamina level
   * @param {int} agilityPoint Stats points set on agility level
   */
  const handleNewPoint = (strengthPoint, staminaPoint, agilityPoint) => {
    const newStrengthLevel = parseInt(playerInfo.strength_id) + strengthPoint;
    const newAgilityLevel = parseInt(playerInfo.agility_id) + agilityPoint;
    const newStaminaLevel = parseInt(playerInfo.stamina_id) + staminaPoint;
    const usedStats = strengthPoint + staminaPoint + agilityPoint;
    const newStatsPoints =
      parseInt(playerInfo.available_stats_points) - usedStats;
    playerInfo.strength_id = newStrengthLevel;
    playerInfo.agility_id = newAgilityLevel;
    playerInfo.stamina_id = newStaminaLevel;
    playerInfo.available_stats_points = newStatsPoints;
    updateBoxer({
      strength: newStrengthLevel,
      agility: newAgilityLevel,
      stamina: newStaminaLevel,
      availableStatsPoints: newStatsPoints,
    });
  };

  /**
   * Handle cost of a fight in current energy
   */
  const handleFightEnergyCost = () => {
    const newCurrentEnergy = parseInt(playerInfo.current_energy) - 20;
    playerInfo.current_energy = newCurrentEnergy;
    updateBoxer({ currentEnergy: newCurrentEnergy });
  };

  return (
    <div className="App">
      {!getGame && (
        <>
          <Header
            isConnected={isLogged}
            setIsDarkMod={setIsDarkMod}
            isDarkMod={isDarkMod}
            setIsConnected={setIsLogged}
            userName={userName}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  userEmail={userEmail}
                  setUserEmail={setUserEmail}
                  userPassword={userPassword}
                  setUserPassword={setUserPassword}
                  isLogged={isLogged}
                  login={login}
                  isDarkMod={isDarkMod}
                  loginFail={loginFail}
                  setLoginFail={setLoginFail}
                  setGetGame={setGetGame}
                  setNewUserEmail={setNewUserEmail}
                  newUserEmail={newUserEmail}
                  setNewUserPassword={setNewUserPassword}
                  newUserPassword={newUserPassword}
                  createUser={createUser}
                  isAdmin={isAdmin}
                />
              }
            />
            <Route
              path="/classement"
              element={
                <Ranking isDarkMod={isDarkMod} players={rankingPlayer} />
              }
            />
            <Route
              path="/creation-boxer"
              element={
                <BoxerChoice
                  isDarkMod={isDarkMod}
                  setNewUserAvatar={setNewUserAvatar}
                  setNewUserPseudo={setNewUserPseudo}
                  newUserPseudo={newUserPseudo}
                  createBoxer={createNewBoxer}
                />
              }
            />
            <Route
              path="/condition-general-d-utilisation"
              element={<Cgu isDarkMod={isDarkMod} />}
            />
            <Route
              path="/mise-a-jour"
              element={<Update isDarkMod={isDarkMod} />}
            />
            <Route
              path="/contact"
              element={<Contact isDarkMod={isDarkMod} />}
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </>
      )}

      {isLogged && getGame && (
        <>
          {notificationMessage !== '' && (
            <Notification message={notificationMessage} />
          )}
          <UserInterface // Fait , manque current energy
            player={playerInfo}
            setGetGame={setGetGame}
            staminaLevel={playerInfo.stamina_id}
            playerLevelExperience={parseInt(playerInfo.level_experience)}
            playerLevel={parseInt(playerInfo.level_id)}
            currentNpc={currentNpc}
            money={playerInfo.money}
            handleNewPoint={handleNewPoint}
            currentEnergy={playerInfo.energy}
            isTrainingDone={isTrainingDone}
            isFightDone={isFightDone}
          />
          <Routes>
            <Route
              path="/jeu"
              element={<Game player={playerInfo} setIsLogged={setIsLogged} />} // Fait
            />
            <Route
              path="/maison"
              element={
                <Home
                  player={playerInfo}
                  setInventory={setInventory}
                  updateBoxer={updateBoxer}
                />
              } // A verifier
            />
            <Route
              path="/salle-entrainement"
              element={
                <Gym // Fait
                  currentTraining={currentTraining}
                  setCurrentTraining={setCurrentTraining}
                  setBeginTimeTraining={setBeginTimeTraining}
                  setEndTimeTraining={setEndTimeTraining}
                  endTimeTraining={endTimeTraining}
                  setAmount={setAmount}
                />
              }
            />
            <Route
              path="/salle-de-combat"
              element={
                <Fight
                  player={playerInfo}
                  npc={npc}
                  npcSkillsList={npcSkills}
                />
              }
            />
            <Route
              path="/travail"
              element={<Work player={playerInfo} updateBoxer={updateBoxer} />}
            />
            <Route
              path="/tournoi"
              element={
                <Tournament
                  player={playerInfo}
                  npc={npc}
                  npcSkillsList={npcSkills}
                />
              }
            />
            <Route
              path="/magasin" // A verifier
              element={
                <Market
                  player={playerInfo}
                  items={marketItems}
                  setInventory={setInventory}
                />
              }
            />
            <Route
              path="/combat"
              element={
                <FightStart // Fait pour player a faire pour les skills
                  player={playerInfo}
                  selectedSkillsList={selectedSkill}
                  npc={npc}
                  npcSkillsList={npcSkills}
                  setCurrentNpc={getNpc}
                  currentNpc={currentNpc}
                  handleFightWin={handleFightWin}
                />
              }
            />
            <Route
              path="/combat-tounoi"
              element={
                <FightStartTounament // Fait pour player a faire pour les skills
                  player={playerInfo}
                  selectedSkillsList={selectedSkill}
                  npc={npc}
                  npcSkillsList={npcSkills}
                  setCurrentNpc={getNpc}
                  currentNpc={currentNpc}
                  handleFightWin={handleFightWin}
                />
              }
            />
            <Route
              path="/choix-competence"
              element={
                <SkillsSelection // Fait pour player a faire pour les skills
                  player={playerInfo}
                  selectedSkillsList={selectedSkill}
                  setSelectedSkillsList={setSelectedSkill}
                  skillsList={skillsList}
                  handleFightEnergyCost={handleFightEnergyCost}
                />
              }
            />
            <Route
              path="/choix-competence-tournoi"
              element={
                <SkillsSelectionTournament // Fait pour player a faire pour les skills
                  player={playerInfo}
                  selectedSkillsList={selectedSkill}
                  setSelectedSkillsList={setSelectedSkill}
                  skillsList={skillsList}
                  handleFightEnergyCost={handleFightEnergyCost}
                />
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
}
//
export default App;
