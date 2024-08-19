import { Fragment, useState } from 'react';
import styles from './CoAuthors.module.scss';

const coAuthors = [
  { name: 'Seema Bawa', imageSrc: '' },
  { name: 'Karun Verma', imageSrc: '' },
    { name: 'Mukesh Saini', imageSrc: '' },
    { name: 'Sandeep Kaur', imageSrc: '' },
    { name: 'Kamaljeet Kaur Bhatia', imageSrc: '' },
    { name: 'Rajesh Kumar', imageSrc: '' },
    { name: 'Sandeep Kaur', imageSrc: '' },
    { name: 'Kamaljeet Kaur Bhatia', imageSrc: '' },
    { name: 'Rajesh Kumar', imageSrc: '' },
    { name: 'Sandeep Kaur', imageSrc: '' },
    { name: 'Kamaljeet Kaur Bhatia', imageSrc: '' },
    { name: 'Rajesh Kumar', imageSrc: '' },
    { name: 'Sandeep Kaur', imageSrc: '' },
    { name: 'Kamaljeet Kaur Bhatia', imageSrc: '' },
    { name: 'Rajesh Kumar', imageSrc: '' },
    { name: 'Sandeep Kaur', imageSrc: '' },
    { name: 'Kamaljeet Kaur Bhatia', imageSrc: '' },
    { name: 'Rajesh Kumar', imageSrc: '' },
    { name: 'Sandeep Kaur', imageSrc: '' },
    { name: 'Kamaljeet Kaur Bhatia', imageSrc: '' },
    { name: 'Rajesh Kumar', imageSrc: '' },
    { name: 'Sandeep Kaur', imageSrc: '' },
    { name: 'Kamaljeet Kaur Bhatia', imageSrc: '' },
    { name: 'Rajesh Kumar', imageSrc: '' },
    { name: 'Sandeep Kaur', imageSrc: '' },
    { name: 'Kamaljeet Kaur Bhatia', imageSrc: '' },
    { name: 'Rajesh Kumar', imageSrc: '' },
    { name: 'Sandeep Kaur', imageSrc: '' },
    { name: 'Kamaljeet Kaur Bhatia', imageSrc: '' },
    { name: 'Rajesh Kumar', imageSrc: '' },
    { name: 'Sandeep Kaur', imageSrc: '' },
    { name: 'Kamaljeet Kaur Bhatia', imageSrc: '' },
    { name: 'Rajesh Kumar', imageSrc: '' },
    { name: 'Sandeep Kaur', imageSrc: '' },
];

const CoAuthors = () => {
  const [showMore, setShowMore] = useState(false);
  const displayedAuthors = showMore ? coAuthors : coAuthors.slice(0, 10);

  return (
    <Fragment>
      <div className={styles.coauthorContainer}>
        <h3>Co-Authors</h3>
        {displayedAuthors.map((author, index) => (
          <div key={index} className={styles.infoContainer}>
            <img src={author.imageSrc} />
            <p>{author.name}</p>
          </div>
        ))}
        {coAuthors.length > 10 && (
          <button
            className={styles.showMoreButton}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default CoAuthors;
