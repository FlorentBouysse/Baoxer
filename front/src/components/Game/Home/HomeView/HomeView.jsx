import './HomeView.scss';

// eslint-disable-next-line react/prop-types
const HomeView = ({ title, content, close }) => {
  return (
    <div className="HomeView">
      <div className="HomeView-container">
        <h2>{title}</h2>
        <p>{content}</p>
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
    </div>
  );
};

HomeView.propTypes = {};

export default HomeView;
