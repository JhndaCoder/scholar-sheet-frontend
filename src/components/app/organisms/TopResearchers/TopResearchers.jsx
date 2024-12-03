import { useState } from 'react';
import { useGetTopResearchers } from '../../../../hooks/useAdminStatsHooks';
import { useFetchTopResearchersInDepartment } from '../../../../hooks/useResearcherStatsHooks';
import { useDepartment } from '../../../../context/DepartmentContext';
import './TopResearchers.scss';

const TopResearchers = ({ scholarId }) => {
  const { selectedDepartment } = useDepartment();

  const [criteria, setCriteria] = useState('totalCitations');
  const [year, setYear] = useState(new Date().getFullYear());

  const {
    data: adminData,
    isLoading: isAdminLoading,
    error: adminError,
  } = useGetTopResearchers(selectedDepartment, criteria, year, 1, 5);

  const {
    data: researcherData,
    isLoading: isResearcherLoading,
    error: researcherError,
  } = useFetchTopResearchersInDepartment(scholarId, criteria, 1, 5);

  const isLoading = scholarId ? isResearcherLoading : isAdminLoading;
  const data = scholarId ? researcherData : adminData;
  const error = scholarId ? researcherError : adminError;

  const handleCriteriaChange = (e) => {
    setCriteria(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  if (isLoading) return <p>Loading top researchers...</p>;
  if (error) return <p>Error loading top researchers: {error.message}</p>;

  return (
    <div className="top-researchers-container">
      <div className="header">
        <h3>Top Researchers {scholarId ? 'in your department' : ''}</h3>
        <div className="dropdowns">
          <div className="selector">
            <label>
              <select value={criteria} onChange={handleCriteriaChange}>
                <option value="totalCitations">Total Citations</option>
                <option value="totalPapers">Total Papers</option>
                <option value="hIndex">H-Index</option>
                <option value="i10Index">i10-Index</option>
              </select>
            </label>
          </div>
          <div className="selector">
            <label>
              <select value={year} onChange={handleYearChange}>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={new Date().getFullYear() - i}>
                    {new Date().getFullYear() - i}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <ul className="researcher-list">
        {data?.researchers.map((researcher, index) => (
          <li key={index} className="researcher-item">
            <div className="researcher-avatar">
              <img
                src={`https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=${researcher.scholar_id}`}
                alt={`Avatar of ${researcher.name}`}
              />
            </div>
            <div className="researcher-info">
              <a
                href={
                  window.location.origin +
                  `/researcher/${researcher.scholar_id}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4>{researcher.name}</h4>
              </a>

              <p className="researcher-department">{researcher.department}</p>
            </div>
            <div className="researcher-stats">
              <span>{researcher[criteria]}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopResearchers;
