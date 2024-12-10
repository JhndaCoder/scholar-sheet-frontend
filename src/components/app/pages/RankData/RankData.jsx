import { useState } from 'react';
import { useGetRankData } from '../../../../hooks/useAdminStatsHooks';
import Spinner from '../../../common/Spinner/Spinner';
import './RankData.scss';

const InstituteRankings = () => {
  const [criteria, setCriteria] = useState('citations');
  const { isLoading, data, error, isError } = useGetRankData(criteria);

  const handleCriteriaChange = (e) => {
    setCriteria(e.target.value);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>Error loading institute rankings: {error.message}</p>;
  }

  return (
    <div className="institute-rankings">
      <h3>Institute Rankings</h3>
      <p className="subtitle">
        Ranked by{' '}
        {criteria === 'citations' ? 'Total Citations' : 'Total Papers'}
      </p>

      <div className="rankings-filter">
        <label>
          <select
            name="rankCriteria"
            value={criteria}
            onChange={handleCriteriaChange}
          >
            <option value="citations">Total Citations</option>
            <option value="totalPapers">Total Papers</option>
          </select>
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Institute</th>
            <th>Total Papers</th>
            <th>Total Citations</th>
          </tr>
        </thead>
        <tbody>
          {data?.rankings?.map((institute) => (
            <tr
              key={institute._id}
              className={institute.rank === 1 ? 'top-ranked' : ''}
            >
              <td>{institute.rank}</td>
              <td>{institute.institute}</td>
              <td>{institute.totalPapers}</td>
              <td>{institute.totalCitations}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstituteRankings;
