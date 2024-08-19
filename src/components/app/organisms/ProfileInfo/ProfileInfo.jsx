import styles from './ProfileInfo.module.scss';
import topg from '../../../../assets/image.png';
import BarChart from '../../../common/Charts/BarChart/BarChart';
import sampleData from './sample';

const ProfileInformation = ({ profileData }) => {
  const profileDetails = [
    profileData.name,
    profileData.role,
    profileData.department,
    profileData.institute
  ];

  return (
    <div className={styles.profileInformation}>
      <div className={styles.profileLeft}>
        <div className={styles.profilePicture}>
          <img src={topg} alt="Profile" />
        </div>
        <div className={styles.profileDetails}>
          {profileDetails.map((detail, index) => (
            <div key={index} className={styles.detailBlock}>
              <p>{detail}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.graphSpace}>
        <BarChart title="Publications" data={sampleData} />
      </div>
    </div>
  );
};

export default ProfileInformation;
