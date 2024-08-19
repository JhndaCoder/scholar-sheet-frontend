import styles from './PubTable.module.scss';

const PubTable = ({ publications }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.publicationTable}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Format</th>
            <th>Publication Name</th>
            <th>Co-Authors</th>
            <th>Platform</th>
            <th>Citations</th>
            <th>Year of Publication</th>
            <th>No of Pages</th>
            <th>h5-index</th>
          </tr>
        </thead>
        <tbody>
          {publications.map((pub, index) => (
            <tr key={index}>
              <td>{pub.no}</td>
              <td>{pub.format}</td>
              <td>{pub.publicationName}</td>
              <td>{pub.coAuthors.join(', ')}</td>
              <td>{pub.platform}</td>
              <td>{pub.citations}</td>
              <td>{pub.yearOfPublication}</td>
              <td>{pub.noOfPages}</td>
              <td>{pub.h5Index}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PubTable;
