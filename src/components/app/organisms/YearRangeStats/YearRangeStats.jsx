import { useState, useCallback } from 'react';
import { useGetStatsForYearRange } from './../../../../hooks/useAdminStatsHooks';
import { useDepartment } from '../../../../context/DepartmentContext';
import './YearRangeStats.scss';

const YearRangeStats = () => {
  const { selectedDepartment } = useDepartment();
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [appliedRange, setAppliedRange] = useState({
    startYear: '',
    endYear: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const { isLoading, data, error } = useGetStatsForYearRange(
    appliedRange.startYear,
    appliedRange.endYear,
    selectedDepartment
  );

  const validateInputsAndSetRange = useCallback(() => {
    let start = parseInt(startYear, 10);
    let end = parseInt(endYear, 10);

    if (!start && !end) {
      setErrorMessage('Please enter at least one valid year.');
      return null;
    }
    if (!start) start = end;
    if (!end) end = start;

    if (start > end) {
      setErrorMessage('Start year cannot be greater than end year.');
      return null;
    }

    setErrorMessage('');
    return { startYear: start, endYear: end };
  }, [startYear, endYear]);

  const handleGenerateStats = () => {
    const validRange = validateInputsAndSetRange();
    if (validRange) {
      setAppliedRange(validRange);
    }
  };

  return (
    <div className="year-range-stats">
      <h3>Generate Yearly Stats</h3>
      <p className="subtitle">
        Analyze publication trends over a specific year range.
      </p>
      <div className="filters">
        <label>
          <input
            type="number"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            placeholder="Start year e.g., 2020"
          />
        </label>
        <label>
          <input
            type="number"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            placeholder="End year e.g., 2024"
          />
        </label>
        <div className="filter-buttons">
          <button onClick={handleGenerateStats}>Generate Stats</button>
        </div>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {isLoading && <p>Loading yearly stats...</p>}
      {error && <p>Error loading yearly stats: {error.message}</p>}
      {data && (
        <div className="stats-cards">
          <div className="card">
            <h4>Total Papers</h4>
            <p className="card-value">{data.totalPapers}</p>
            <p className="card-subtext">
              Published between {appliedRange.startYear} and{' '}
              {appliedRange.endYear}
            </p>
          </div>
          <div className="card">
            <h4>Total Citations</h4>
            <p className="card-value">{data.totalCitations}</p>
            <p className="card-subtext">From papers in this range</p>
          </div>
          <div className="card">
            <h4>H-Index</h4>
            <p className="card-value">{data.hIndex}</p>
            <p className="card-subtext">For the specified range</p>
          </div>
          <div className="card">
            <h4>i10-Index</h4>
            <p className="card-value">{data.i10index}</p>
            <p className="card-subtext">Papers with 10+ citations</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default YearRangeStats;
