import styles from './UpDownButton.module.scss';

const UpDownButton = ({ label }) => {
  return (
    <button className={styles.updownButton}>
      {label} <span className={styles.arrowUpDown}>&#9650;&#9660;</span>
    </button>
  );
};

export default UpDownButton;
