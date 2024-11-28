import './Spinner.scss';

const Spinner = ({ small = false, radius = '6rem' }) => {
  return (
    <div className="spinner-container">
      <div
        className={`loading ${small ? 'small' : ''}`}
        style={{ height: radius, width: radius }}
      />
    </div>
  );
};

export default Spinner;
