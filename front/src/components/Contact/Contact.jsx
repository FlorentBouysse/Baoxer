/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
// ---- Utils ---- //
import React from 'react';

// ---- Icons ---- //
import { Mail } from 'react-feather';

// ---- SCSS ---- //
import './Contact.scss';

const Contact = () => {
  const emailLink = 'mailto:baoxing.oclock@gmail.com';

  return (
    <div className="contact-page">
      <div className="contact-content dark-mod">
        <div className="left">
          <h1>Contactez-nous</h1>
          <p>
            Une question , un soucis dans l'application ou simplement nous
            partager vos idées c'est ici que ça ce passe.
          </p>
        </div>
        <div className="contact-buttons">
          <a className="email-button" href={emailLink}>
            <Mail size={70} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
