/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
const MenuStat = ({
  stat,
  current,
  currentSetter,
  setter,
  experience,
  maxExperience,
  setAmount,
  amount,
  setMaxReached,
  max,
}) => {
  return (
    <div className="stat">
      <h2 className={stat}>{stat}</h2>
      <p className={`current ${stat}`}>{current}</p>
      <div className={`handler ${stat}`}>
        <p>{currentSetter}</p>
        <button
          className="add"
          type="button"
          onClick={() => {
            if (amount < max) {
              setter(currentSetter + 1);
              setAmount(amount + 1);
            } else {
              setMaxReached(true);
            }
          }}
        >
          +
        </button>
      </div>
      <div className="experience">
        <p
          className={stat}
          style={{
            width: `${(experience * maxExperience) / 10000}%`,
            minWidth: 'fit-content',
          }}
        >
          {experience}
        </p>
      </div>
    </div>
  );
};

MenuStat.propTypes = {};

export default MenuStat;
