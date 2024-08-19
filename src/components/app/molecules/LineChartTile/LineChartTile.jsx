import LineChart from '../../../common/Charts/LineChart/LineChart';
import styles from './LineChartTile.module.scss';
import data from './data';
import data2 from './data2';
import { Fragment } from 'react';
const LineChartTile = () => {
  return (
    <Fragment>
        <div className={styles.linechartContainer}>
            <LineChart title="Yearly Citations" data={data} />
            <LineChart title="Yearly I-10 Index" data={data2} />
        </div>
    </Fragment>
  )
}

export default LineChartTile;
