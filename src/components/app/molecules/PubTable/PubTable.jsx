import styles from './PubTable.module.scss';

const PubTable = () => {
  const publications = [
    { rank: 1, name: 'Nature', h5Index: 488, h5Median: 745 },
    { rank: 2, name: 'IEEE/CVF Conference on Computer Vision and Pattern Recognition', h5Index: 440, h5Median: 689 },
    { rank: 3, name: 'The New England Journal of Medicine', h5Index: 434, h5Median: 897 },
    { rank: 4, name: 'Science', h5Index: 434, h5Median: 897 },
    { rank: 5, name: 'Science', h5Index: 434, h5Median: 897 },
    { rank: 6, name: 'Science', h5Index: 434, h5Median: 897 },
    { rank: 7, name: 'Science', h5Index: 434, h5Median: 897 },
    { rank: 8, name: 'Science', h5Index: 434, h5Median: 897 },
    { rank: 9, name: 'Science', h5Index: 434, h5Median: 897 },
    { rank: 10, name: 'Science', h5Index: 434, h5Median: 897 },
  ];

  return (
    <div className={styles.tableContainer}>
      <table className={styles.PubTable}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Publication</th>
            <th>h5-index</th>
            <th>h5-median</th>
          </tr>
        </thead>
        <tbody>
          {publications.map((pub, index) => (
            <tr key={index}>
              <td>{pub.rank}</td>
              <td>{pub.name}</td>
              <td>{pub.h5Index}</td>
              <td>{pub.h5Median}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PubTable;
