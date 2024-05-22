/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const UpdateCard = ({ content }) => {
  const list = content.listArray;
  return (
    <div className="update-content-row">
      <h4>{content.title}</h4>
      <ul>
        {list.map((currentList) => {
          return <li key={currentList}>{currentList}</li>;
        })}
      </ul>
    </div>
  );
};

UpdateCard.propTypes = {};

export default UpdateCard;
