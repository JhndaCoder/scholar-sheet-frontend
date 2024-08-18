import styles from './ProfileInfo.module.scss';
import topg from '../../../../assets/image.png';
const ProfileInformation = ({ profileData }) => {
  const departmentInfo = [
    { label: "Department", value: profileData.department },
    { label: "Role", value: profileData.role },
    { label: "Institute", value: profileData.institute },
    { label: "University", value: profileData.university },
    { label: "YOE", value: profileData.experience },
    { label: "ResearchArea", value: profileData.researchArea }
  ];

  return (
    <div className={styles.profileInformation}>
      <div className={styles.profilePicture}>
        <img src={topg} />
        <h3>{profileData.name}</h3>
      </div>
      <div className={styles.deptInformation}>
        <div className={styles.row}>
          {departmentInfo.slice(0, 3).map((info, index) => (
            <div key={index} className={styles.infoBlock}>
              <h4>{info.label}</h4>
              <h3>{info.value}</h3>
            </div>
          ))}
        </div>
        <div className={styles.row}>
          {departmentInfo.slice(3).map((info, index) => (
            <div key={index} className={styles.infoBlock}>
              <h4>{info.label}</h4>
              <h3>{info.value}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
