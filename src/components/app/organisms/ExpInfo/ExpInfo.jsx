import styles from './ExpInfo.module.scss';

const ExpInfo = ({ experiences = [] }) => {
  return (
    <div className={styles.expContainer}>
        <h3>Experience</h3>
      {experiences.map((exp, index) => (
        <div className={styles.expItem} key={index}>
          <div className={styles.year}>
            <span>{exp.startYear}</span>
            <span>{exp.endYear}</span>
          </div>
          <div className={styles.lineContainer}>
            <div className={styles.line}></div>
            <div className={styles.dot}></div>
          </div>
          <div className={styles.details}>
            <h4>{exp.role}</h4>
            <p>{exp.department}</p>
            <p>{exp.institute}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpInfo;
