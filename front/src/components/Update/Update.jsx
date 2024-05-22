/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import './Update.scss';
import UpdateCard from './UpdateCard/UpdateCard';

const Update = ({ isDarkMod }) => {
  const [cssDarkMod, setCssDarkMod] = useState(isDarkMod ? 'dark-mod' : '');

  useEffect(() => {
    setCssDarkMod(isDarkMod ? 'dark-mod' : '');
  }, [isDarkMod]);

  const text =
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat  velit labore! Eius rem consequatur veniam';
  const updateContentFirstRow = [
    {
      title: 'Graphisme',
      listArray: [text, text],
      id: 1,
    },
    {
      title: 'Jouabilité',
      listArray: [text, text],
      id: 2,
    },
    {
      title: 'Performance',
      listArray: [text, text],
      id: 3,
    },
    {
      title: 'Ux',
      listArray: [text, text],
      id: 4,
    },
    {
      title: 'Interface',
      listArray: [text, text],
      id: 5,
    },
  ];
  const updateContentSecondRow = [
    {
      title: 'Graphisme',
      listArray: [text, text],
      id: 6,
    },
    {
      title: 'Jouabilité',
      listArray: [text, text],
      id: 7,
    },
    {
      title: 'Performance',
      listArray: [text, text],
      id: 8,
    },
  ];
  const updateContentThirdRow = [
    {
      title: 'Graphisme',
      listArray: [text, text],
      id: 9,
    },
    {
      title: 'Jouabilité',
      listArray: [text, text],
      id: 10,
    },
    {
      title: 'Performance',
      listArray: [text, text],
      id: 11,
    },
    {
      title: 'Ux',
      listArray: [text, text],
      id: 12,
    },
  ];
  const updateContentFourthRow = [
    {
      title: 'Graphisme',
      listArray: [text, text],
      id: 13,
    },
    {
      title: 'Jouabilité',
      listArray: [text, text],
      id: 14,
    },
    {
      title: 'Performance',
      listArray: [text, text],
      id: 15,
    },
    {
      title: 'Ux',
      listArray: [text, text],
      id: 16,
    },
    {
      title: 'Interface',
      listArray: [text, text],
      id: 17,
    },
  ];
  const updateContentFifthRow = [
    {
      title: 'Graphisme',
      listArray: [text, text],
      id: 18,
    },
    {
      title: 'Jouabilité',
      listArray: [text, text],
      id: 19,
    },
    {
      title: 'Performance',
      listArray: [text, text],
      id: 20,
    },
  ];
  return (
    <div className="update">
      <div className="update-content">
        <h5 className={cssDarkMod}>Mise a jour 1.3</h5>
        <div className="update-content-first">
          {updateContentFirstRow.map((currentContent) => {
            return (
              <UpdateCard key={currentContent.id} content={currentContent} />
            );
          })}
        </div>
        <h5 className={cssDarkMod}>Mise a jour 1.2</h5>
        <div className="update-content-second">
          {updateContentSecondRow.map((currentContent) => {
            return (
              <UpdateCard key={currentContent.id} content={currentContent} />
            );
          })}
        </div>
        <h5 className={cssDarkMod}>Mise a jour 1.1</h5>
        <div className="update-content-third">
          {updateContentThirdRow.map((currentContent) => {
            return (
              <UpdateCard key={currentContent.id} content={currentContent} />
            );
          })}
        </div>
        <h5 className={cssDarkMod}>Mise a jour 1.0</h5>
        <div className="update-content-first">
          {updateContentFourthRow.map((currentContent) => {
            return (
              <UpdateCard key={currentContent.id} content={currentContent} />
            );
          })}
        </div>
        <h5 className={cssDarkMod}>Betâ</h5>
        <div className="update-content-second">
          {updateContentFifthRow.map((currentContent) => {
            return (
              <UpdateCard key={currentContent.id} content={currentContent} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

Update.propTypes = {};

export default Update;
