/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import './Climbing.scss';

const Climbing = ({ close }) => {
  return (
    <div className="Climbing">
      <div className="Climbing-head">
        <h2 className="Climbing-title">Escalader</h2>
        <div className="Climbing-headers">
          <h3 className="Climbing-column-duree">Durée</h3>
          <h3 className="Climbing-column-cout">Coût</h3>
          <h3 className="Climbing-column-gain">Gain</h3>
          <h3 className="Climbing-column-played">Lancement</h3>
        </div>
      </div>

      <div className="Climbing-activity-list">
        <div className="Climbing-players1">
          <p className="Climbing-players-info">Durée 1 = 2h</p>
          <p className="Climbing-players-info">10 pts dénergie</p>
          <p className="Climbing-players-info">+20% dexpérience de force</p>
          <button type="button" className="Climbing-players1-played1">
            Play
          </button>
        </div>

        <div className="Climbing-players2">
          <p className="Climbing-players-info">Durée 2 = 4h</p>
          <p className="Climbing-players-info">20 pts dénergie</p>
          <p className="Climbing-players-info">+40% dexpérience de force</p>
          <button type="button" className="Climbing-players2-played2">
            Play
          </button>
        </div>

        <div className="Climbing-players3">
          <p className="Climbing-players-info">Durée 3 = 6h</p>
          <p className="Climbing-players-info">30 pts dénergie</p>
          <p className="Climbing-players-info">+50% dexpérience de force</p>
          <button type="button" className="Climbing-players3-played3">
            Play
          </button>
        </div>
      </div>
      <div className="Climbing-end" />
      <button
        type="button"
        className="close"
        onClick={() => {
          close(false);
        }}
      >
        X
      </button>
    </div>
  );
};

Climbing.propTypes = {};

export default Climbing;
