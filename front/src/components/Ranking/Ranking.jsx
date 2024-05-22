/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import PlayerRow from './PlayerRow/PlayerRow';
import './Ranking.scss';

const Ranking = ({ isDarkMod, players }) => {
  const [cssDarkMod, setCssDarkMod] = useState(isDarkMod ? 'dark-mod' : '');
  const [cssDarkModGradient, setCssDarkModGradient] = useState(
    isDarkMod ? 'dark-mod-gradient' : ''
  );
  const [tempPlayer, setTempPlayer] = useState('');

  useEffect(() => {
    setCssDarkMod(isDarkMod ? 'dark-mod' : '');
    setCssDarkModGradient(isDarkMod ? 'dark-mod-gradient' : '');
  }, [isDarkMod]);

  useEffect(() => {
    if (players && players.length > 0) {
      const rankedPlayers = players
        .filter((currentPlayer) => currentPlayer.npc === false)
        .sort((a, b) => b.win - a.win);
      setTempPlayer(rankedPlayers);
    }
  }, [players]);

  return (
    <div className="ranking">
      <div className="ranking-container">
        <h2 className={`ranking-title ${cssDarkMod}`}>Meilleurs Baoxers</h2>
        <div className="ranking-headers">
          <h3>Nom du Baoxer</h3>
          <h3 className="ranking-headers-fight">Nombre de combats remportés</h3>
          <h3 className="ranking-headers-tournament">
            Nombre de tournois remportés
          </h3>
          <h3>Classement</h3>
        </div>
        {tempPlayer !== '' && (
          <div className="ranking-players-list">
            {tempPlayer.map((currentPlayer, index) => {
              const rank = index + 1; // Utilisez l'index pour déterminer le rang
              return (
                <PlayerRow
                  key={currentPlayer.id}
                  username={currentPlayer.username}
                  win={currentPlayer.win}
                  rank={rank}
                  tournament={currentPlayer.tournament.length}
                  avatar={currentPlayer.picture}
                />
              );
            })}
          </div>
        )}

        <div className={`ranking-end ${cssDarkMod}`} />
      </div>
    </div>
  );
};

Ranking.propTypes = {};

export default Ranking;
