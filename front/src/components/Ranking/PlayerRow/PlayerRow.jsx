/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import './PlayerRow.scss';

const PlayerRow = ({ username, win, rank, tournament, avatar }) => {
  return (
    <div className="ranking-players">
      <div className="ranking-players-info">
        <img
          className="ranking-players-info-avatar"
          src={`public/asset/playerImage/player-${
            avatar.length > 1 ? 3 : avatar
          }.png`}
          alt="avatar"
        />
        <p className="ranking-players-info-name">{username || ''}</p>
      </div>
      <p>{win || 0}</p>
      <p>{tournament}</p>
      <p>{rank}</p>
    </div>
  );
};

PlayerRow.propTypes = {};

export default PlayerRow;
