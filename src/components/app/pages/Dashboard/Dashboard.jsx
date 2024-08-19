import InfoVis from "../../organisms/InfoVis/InfoVis";
import PubInfo from "../../organisms/PubInfo/PubInfo";
import styles from './Dashboard.module.scss';
import Logo from '../../atoms/Logo/Logo';
import SearchBar from '../../../common/SearchBar/SearchBar';

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.headerContainer}>
          <Logo />
          <SearchBar
            width="800px"
            placeholder="Search for person or institute"
          />
        </div>
      <InfoVis />
      <PubInfo/>
    </div>
  )
}

export default Dashboard
