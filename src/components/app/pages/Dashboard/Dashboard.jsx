import InfoVis from "../../organisms/InfoVis/InfoVis";
import PubInfo from "../../organisms/PubInfo/PubInfo";
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <InfoVis />
      <PubInfo/>
    </div>
  )
}

export default Dashboard
