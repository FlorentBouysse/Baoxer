/* eslint-disable @typescript-eslint/no-unused-vars */
import './BodybuildingView.scss';

const BodybuildingView = ({ close }) => {
  return (
    <div className="bodyView">
      <div className="bodybuild-head">
        <h2 className="bodybuild-title">
          Bienvenue dans la salle de musculation
        </h2>
        <div className="bodybuild-headers">
          <h3 className="bodybuild-column-duree">Durée</h3>
          <h3 className="bodybuild-column-cout">Coût</h3>
          <h3 className="bodybuild-column-gain">Gain</h3>
          <h3 className="bodybuild-column-played">Lancement</h3>
        </div>
      </div>

      <div className="bodybuild-activity-list">
        <div className="bodyView-players1">
          <p className="bodyView-players-info">Durée 1 = 2h</p>
          <p className="bodyView-players-info">10 pts dénergie</p>
          <p className="bodyView-players-info">+20% dexpérience de force</p>
          <button type="button" className="bodyView-players1-played1">
            Play
          </button>
        </div>

        <div className="bodyView-players2">
          <p className="bodyView-players-info">Durée 2 = 4h</p>
          <p className="bodyView-players-info">20 pts dénergie</p>
          <p className="bodyView-players-info">+40% dexpérience de force</p>
          <button type="button" className="bodyView-players2-played2">
            Play
          </button>
        </div>

        <div className="bodyView-players3">
          <p className="bodyView-players-info">Durée 3 = 6h</p>
          <p className="bodyView-players-info">30 pts dénergie</p>
          <p className="bodyView-players-info">+50% dexpérience de force</p>
          <button type="button" className="bodyView-players3-played3">
            Play
          </button>
        </div>
      </div>
      <div className="bodybuild-end" />
      <button
        type="button"
        className="close"
        onClick={() => {
          close(false);
        }}
      >
        X
      </button>
    </div>
  );
};

BodybuildingView.propTypes = {};

export default BodybuildingView;
