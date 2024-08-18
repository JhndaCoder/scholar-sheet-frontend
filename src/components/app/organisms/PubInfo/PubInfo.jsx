import { Fragment } from 'react';
import styles from './PubInfo.module.scss';
import UpDownButton from '../../../common/UpDownButton/UpDownButton';
import PubTable from '../../molecules/PubTable/PubTable';
import Button from '../../../common/Button/Button';

const PubInfo = () => {
  return (
    <Fragment>
        <div className={styles.pubinfoContainer}>
            <h3>Publications</h3>
            <div className={styles.buttonContainer}>
                <UpDownButton label="Categories" />
                <UpDownButton label="Yearly" />
                <UpDownButton label="English" />
            </div>
            <PubTable />       
            <Button width="60px" >View All</Button>

            
        </div>
    </Fragment>
  )
}
export default PubInfo;
