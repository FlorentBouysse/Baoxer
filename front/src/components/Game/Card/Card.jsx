import { Link } from 'react-router-dom';
import './Card.scss';

const Card = ({ title, className, link, description }) => {
  return (
    <Link to={link}>
      <div className="Card-container">
        <div className="Card">
          <h2>{title}</h2>
          <div className={`Card-image ${className}`} />
          <p className="Card-description">{description}</p>
        </div>
      </div>
    </Link>
  );
};

Card.propTypes = {};

export default Card;
