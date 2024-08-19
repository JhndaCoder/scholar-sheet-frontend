import { Fragment } from 'react';
import styles from './InfoVis.module.scss';
import UpDownButton from '../../../common/UpDownButton/UpDownButton';
import PieChart from '../../../common/Charts/PieChart/PieChart';
import info from './info';
import publishers from './publishers';
import yearWise from './yearWise';
import domains from './domains';
import DataTile from '../../molecules/DataTile/DataTile';

const InfoVis = () => {
  return (
    <Fragment>
        <div className={styles.infoVisContainer}>
        <DataTile/>
          <div className={styles.infoVisHeading}>
            {/* <h3>Visualisation</h3> */}
            
            <div className={styles.buttonContainer}>
                <UpDownButton label="Pie Chart" />
                <UpDownButton label="Monthly" />
            </div>
          </div>
        <div className={styles.chartoKaGhar}>
          <PieChart title="Total Research Publications by Department" data={info} />
          <PieChart title="Top Publishers Across Departments" data={publishers} />
          <PieChart title="Year Wise Publications" data={yearWise} />
          <PieChart title="Domain of Publishing" data={domains} />
          
        </div>
        </div>
    </Fragment>
  )
}

export default InfoVis;
