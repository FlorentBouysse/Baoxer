/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import './Modal.scss';

const Modal = ({ title, content, isFight, sender, damage, skill, count }) => {
  const [modalShown, setModalShown] = useState(true);

  useEffect(() => {
    if (isFight) {
      //
    } else {
      setTimeout(() => {
        setModalShown(false);
      }, 10000);
    }
  }, [content]);
  return (
    <div className="noModal">
      {modalShown && (
        <div className="Modal">
          <div className="main">
            <h2>{title}</h2>
            <div className="Modal-content">
              {isFight && count !== 0 ? (
                <p className="text">
                  {count === 1 ? 'On commence avec' : ''} <span>{sender}</span>{' '}
                  {count > 1 ? 'réponds et ' : ''}
                  inflige <span className="damage">{damage}</span> dégats en
                  utilisant <span>{skill}</span>
                </p>
              ) : (
                <p className="text">{content}</p>
              )}
            </div>
          </div>
          <div className="coach">
            <div className="coach-image" />
          </div>
        </div>
      )}
    </div>
  );
};

Modal.propTypes = {};

export default Modal;
