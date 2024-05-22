/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';

const WorkingComponent = ({
  length,
  cost,
  gain,
  className,
  money,
  handleNewWork,
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
        <p>+ {money} $</p>
      </div>
      <div>
        <button
          type="button"
          className="launch"
          onClick={() => {
            handleNewWork(length);
          }}
        >
          Lancer
        </button>
      </div>
    </div>
  );
};

WorkingComponent.propTypes = {};

export default WorkingComponent;
