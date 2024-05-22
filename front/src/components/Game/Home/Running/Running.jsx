/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import './Running.scss';

const Running = ({ close }) => {
  return (
    <div className="Running">
      <div className="Running-head">
        <h2 className="Running-title">Courir</h2>
        <div className="Running-headers">
          <h3 className="Running-column-duree">Durée</h3>
          <h3 className="Running-column-cout">Coût</h3>
          <h3 className="Running-column-gain">Gain</h3>
          <h3 className="Running-column-played">Lancement</h3>
        </div>
      </div>

      <div className="Running-activity-list">
        <div className="Running-players1">
          <p className="Running-players-info">Durée 1 = 2h</p>
          <p className="Running-players-info">10 pts dénergie</p>
          <p className="Running-players-info">+20% dexpérience de force</p>
          <button type="button" className="Running-players1-played1">
            Play
          </button>
        </div>

        <div className="Running-players2">
          <p className="Running-players-info">Durée 2 = 4h</p>
          <p className="Running-players-info">20 pts dénergie</p>
          <p className="Running-players-info">+40% dexpérience de force</p>
          <button type="button" className="Running-players2-played2">
            Play
          </button>
        </div>

        <div className="Running-players3">
          <p className="Running-players-info">Durée 3 = 6h</p>
          <p className="Running-players-info">30 pts dénergie</p>
          <p className="Running-players-info">+50% dexpérience de force</p>
          <button type="button" className="Running-players3-played3">
            Play
          </button>
        </div>
      </div>
      <div className="Running-end" />
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

Running.propTypes = {};

export default Running;
