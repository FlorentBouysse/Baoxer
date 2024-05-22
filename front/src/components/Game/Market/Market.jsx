/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import itemIcons from '../../../utils/data';
import './Market.scss';

const Market = ({ player, items, setInventory }) => {
  const [cart, setCart] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [purchasedItem, setPurchasedItem] = useState(null);
  const [purchasedItemsData, setPurchasedItemsData] = useState([]);

  //
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(0);
  //

  const handleBuy = (currentItemName) => {
    if (cart[currentItemName] > 0) {
      const existingItemIndex = purchasedItemsData.findIndex(
        (item) => item.name === currentItemName
      );
      if (existingItemIndex !== -1) {
        // Si l'article existe déjà, mettre à jour la quantité
        setPurchasedItemsData((prevData) => {
          const newData = [...prevData];
          newData[existingItemIndex].quantity += 1;
          return newData;
        });
      } else {
        // Si l'article n'existe pas, ajout à la liste
        const newItem = {
          id: Date.now(),
          name: currentItemName,
          quantity: cart[currentItemName],
          icon: items.find((item) => item.name === currentItemName)?.icon,
        };
        setPurchasedItemsData((prevData) => [...prevData, newItem]);
      }

      setCart((prevCart) => ({ ...prevCart, [itemName]: 0 }));

      setPurchasedItem(itemName);
      setShowModal(true);

      const buyItemSound = new Audio(`public/asset/Audio/SFX/sfx_buy_item.mp3`);
      buyItemSound.play();

      setTimeout(() => {
        setShowModal(false);
        setPurchasedItem(null);
      }, 2000);
    }
  };

  const handleIncrement = (currentItemName) => {
    setCart((prevCart) => ({
      ...prevCart,
      [currentItemName]: (prevCart[currentItemName] || 0) + 1,
    }));
  };

  const handleDecrement = (currentItemName) => {
    setCart((prevCart) => ({
      ...prevCart,
      [currentItemName]: Math.max((prevCart[currentItemName] || 0) - 1, 0),
    }));
  };

  useEffect(() => {
    // Récupérer les données du localStorage
    const storedData = localStorage.getItem('purchasedItems');
    if (storedData) {
      setPurchasedItemsData(JSON.parse(storedData));
    }
    setItemQuantity(0);
    setItemName('');
  }, []);

  useEffect(() => {
    localStorage.setItem('purchasedItems', JSON.stringify(purchasedItemsData));
  }, [purchasedItemsData]);

  return (
    <div className="market">
      <div className="market-table">
        <h1 className="market-title">Market</h1>
        <div className="table-header">
          <div>Nom</div>
          <div>Prix</div>
          <div>Description</div>
          <div>Effet</div>
          <div>Quantité</div>
        </div>
        <div className="row-container">
          {items.map((item) => (
            // setCurrentIcon(itemIcons.filter((currentIcons) => currentIcons.id === items.id));
            <div key={item.name} className="table-row">
              <p className="item-name">{item.name}</p>
              <p>{item.price} $</p>
              <p className="item-description">{item.description}</p>
              <p>{item.effect}</p>
              <div className="align">
                <button
                  type="button"
                  onClick={() => handleDecrement(item.name)}
                  disabled={cart[item.name] <= 0}
                >
                  -
                </button>
                {cart[item.name] || 0}
                <button
                  type="button"
                  onClick={() => {
                    handleIncrement(item.name);
                    setItemName(item.name);
                    if (itemName !== item.name) {
                      setItemQuantity(0 + 1);
                    } else {
                      setItemQuantity(itemQuantity + 1);
                    }
                  }}
                >
                  +
                </button>
              </div>
              <div className="align">
                <img
                  src={itemIcons.id === item.id ? itemIcons.iconUrl : ''}
                  alt={item.name}
                  className="item-icon"
                />
              </div>
              <div className="align">
                <button
                  type="button"
                  onClick={() => {
                    let priceToPay = itemQuantity * item.price;
                    let moneyAfterPay = player.money - priceToPay;
                    if (moneyAfterPay >= 0) {
                      handleBuy(item.name);
                      setInventory({
                        quantity: itemQuantity,
                        name: item.name,
                        icon: itemIcons.id === item.id ? itemIcons.iconUrl : '',
                        itemPrice: priceToPay,
                      });
                      setItemQuantity(0);
                    } else {
                      priceToPay = '';
                      moneyAfterPay = '';
                    }
                  }}
                >
                  Acheter
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <div className={`modal ${showModal ? 'active' : ''}`}>
          <div className="modal-content">
            <p>{`Item${cart[purchasedItem] > 1 ? 's' : ''} ajouté${
              cart[purchasedItem] > 1 ? 's' : ''
            } dans votre frigo : ${purchasedItem} !`}</p>
            {purchasedItem && (
              <img
                src={items.find((item) => item.name === purchasedItem)?.icon}
                alt={purchasedItem}
                className="purchased-item-icon"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Market.propTypes = {};

export default Market;
