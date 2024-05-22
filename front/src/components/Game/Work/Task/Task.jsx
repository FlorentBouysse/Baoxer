/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';

const Task = ({ color, title, icon, text, isOpen, ability = '' }) => {
  return (
    <div className={`work-container-element ${color}`}>
      <h2 className={`title ${color}`}>{title}</h2>
      <div className="work-container-element-content">
        <div className={`work-container-element-content-image ${icon}`} />
        <p className={`description ${color}`}>{text}</p>
      </div>
      <button
        type="button"
        label="button"
        className={`select-working ${color}`}
        onClick={() => {
          isOpen(true);
          if (ability !== '') {
            ability(title);
          }
        }}
      >
        Choisir ce travail
      </button>
    </div>
  );
};

Task.propTypes = {
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isOpen: PropTypes.func.isRequired,
};

export default Task;
