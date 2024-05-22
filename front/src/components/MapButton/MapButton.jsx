import { Link } from 'react-router-dom';
import activities from '../../utils/routes';
import './MapButton.scss';
import Card from '../Game/Card/Card';

const MapButton = (props) => {
  return (
    <div className="mapButton">
      {activities.map((currentActivity) => {
        return (
          <Card
            title={currentActivity.title}
            className={currentActivity.className}
            link={currentActivity.link}
            description={currentActivity.description}
            key={currentActivity.title}
          />
        );
      })}
    </div>
  );
};

MapButton.propTypes = {};

export default MapButton;
