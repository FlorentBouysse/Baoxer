/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const TrainingComponent = ({
  length,
  cost,
  gain,
  setter,
  className,
  setAmount,
}) => {
  return (
    <div className={`training-content ${className}`}>
      <div>
        <p>{length}h</p>
      </div>
      <div>
        <p>{cost} pts énergie</p>
      </div>
      <div>
        <p>+ {gain} % d'experience</p>
      </div>
      <div>
        <button
          type="button"
          className="launch"
          onClick={() => {
            setter(length);
            setAmount(gain);
          }}
        >
          Lancer
        </button>
      </div>
    </div>
  );
};

TrainingComponent.propTypes = {};

export default TrainingComponent;
