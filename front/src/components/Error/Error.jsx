/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';
import './Error.scss';

const Error = () => {
  return (
    <div className="error">
      <div className="error-page">
        <div className="notFound" />
        <Link to="/">
          <button type="button">Acceuil</button>
        </Link>
      </div>
    </div>
  );
};

Error.propTypes = {};

export default Error;
