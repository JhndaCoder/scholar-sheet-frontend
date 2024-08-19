import { Fragment, useState, useEffect } from 'react';
import styles from './PubInfo.module.scss';
import UpDownButton from '../../../common/UpDownButton/UpDownButton';
import PubTable from '../../molecules/PubTable/PubTable';
import Button from '../../../common/Button/Button';
import publications from '../../molecules/PubTable/samplepubs';

const formatOptions = ['All', 'Journal', 'Conference', 'Book', 'Thesis', 'Patent', 'Others'];
const yearOptions = ['All', '2024', '2023', '2022', '2021', '2020'];
const platformOptions = ['All', 'IEEE', 'ACM', 'Springer', 'Elsevier', 'Others'];

const getTotalFormats = () => {
  const formatCounts = publications.reduce((acc, pub) => {
    acc[pub.format] = (acc[pub.format] || 0) + 1;
    return acc;
  }, {});

  return formatCounts;
};

const PubInfo = () => {
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const totalFormats = getTotalFormats();

  const [displayCounts, setDisplayCounts] = useState(
    Object.keys(totalFormats).reduce((acc, format) => {
      acc[format] = 0;
      return acc;
    }, {})
  );

  useEffect(() => {
    Object.entries(totalFormats).forEach(([format, count]) => {
      let currentCount = 0;
      const interval = setInterval(() => {
        currentCount += 1;
        setDisplayCounts(prevCounts => ({
          ...prevCounts,
          [format]: currentCount
        }));
        if (currentCount === count) {
          clearInterval(interval);
        }
      }, 300 / count);
    });
  }, []);

  const filterPublications = () => {
    return publications.filter(pub => {
      const formatMatch = selectedFormat === 'All' || pub.format === selectedFormat;
      const yearMatch = selectedYear === 'All' || pub.yearOfPublication.toString() === selectedYear;
      const platformMatch = selectedPlatform === 'All' || pub.platform === selectedPlatform;
      return formatMatch && yearMatch && platformMatch;
    });
  };

  const filteredPublications = filterPublications();

  return (
    <Fragment>
      <div className={styles.pubinfoContainer}>
        <h3>Publications</h3>
        <div className={styles.totalFormats}>
          {Object.entries(displayCounts).map(([format, count]) => (
            <div key={format} className={styles.formatItem}>
              <h2>{count}</h2>
              <div>{format}</div>
            </div>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <UpDownButton label="Format" options={formatOptions} onSelect={setSelectedFormat} />
          <UpDownButton label="Year" options={yearOptions} onSelect={setSelectedYear} />
          <UpDownButton label="Platform" options={platformOptions} onSelect={setSelectedPlatform} />
        </div>
        <PubTable publications={filteredPublications} />
        <Button width="60px">View All</Button>
      </div>
    </Fragment>
  );
};

export default PubInfo;
