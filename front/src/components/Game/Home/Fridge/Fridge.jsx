/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Fridge.scss';

const Fridge = ({ player, clear }) => {
  const purchasedItems =
    JSON.parse(localStorage.getItem('purchasedItems')) || [];

  const [inventory, setInventory] = useState(player.inventory);

  useEffect(() => {
    setInventory(inventory.filter((currentItem) => currentItem.quantity));
    clear('');
  }, [player]);

  return (
    <div className="fridge">
      <h2 className="fridge-title">Votre Frigo</h2>
      <div className="fridge-table">
        <div className="table-header">
          <div className="table-header-name">Nom</div>
          <div className="table-header-quantity">Quantité</div>
        </div>
        <div className="row-container">
          {inventory.map((item) => (
            <div key={item.name} className="table-row">
              <div className="item-name">
                <img src={item.icon} alt={item.name} />
                <p>{item.name}</p>
              </div>
              <p>{`x${item.quantity}`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Fridge.propTypes = {};

export default Fridge;
