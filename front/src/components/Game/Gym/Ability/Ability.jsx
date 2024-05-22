/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';

const Ability = ({
  color,
  title,
  icon,
  text,
  isOpen,
  ability = '',
  handleExpUpDaily,
  buttonTitle,
}) => {
  return (
    <div className={`work-container-element ${color}`}>
      <h2 className={`title ${color}`}>{title}</h2>
      <div className="gym-container-element-content">
        <div className={`gym-container-element-content-image ${icon}`} />
        <p className={`description ${color}`}>{text}</p>
      </div>
      <button
        type="button"
        label="button"
        className={`select-training ${color}`}
        onClick={() => {
          if (isOpen) {
            isOpen(true);
          }
          if (ability !== '') {
            ability(title);
          }
          if (
            title === 'Musculation' ||
            title === 'Courir' ||
            title === 'Escalader'
          ) {
            handleExpUpDaily(title);
          }
        }}
      >
        {buttonTitle || "Choisir l'entraînement"}
      </button>
    </div>
  );
};

Ability.propTypes = {
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Ability;
