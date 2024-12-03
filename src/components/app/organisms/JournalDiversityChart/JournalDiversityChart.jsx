import { useState } from 'react';
import { useGetJournalDiversity } from '../../../../hooks/useAdminStatsHooks';
import { useFetchResearcherJournalDiversity } from '../../../../hooks/useResearcherStatsHooks';
import { useDepartment } from '../../../../context/DepartmentContext';
import PieChartComponent from '../../../common/PieChartComponent/PieChartComponent';
import './JournalDiversityChart.scss';
import Spinner from '../../../common/Spinner/Spinner';

const JournalDiversityChart = ({ scholarId }) => {
  const currentYear = new Date().getFullYear();
  const { selectedDepartment } = useDepartment();
  const [year, setYear] = useState(currentYear);
  const [chartType, setChartType] = useState('Pie');

  const {
    data: adminData,
    isLoading: isAdminLoading,
    error: adminError,
  } = useGetJournalDiversity(selectedDepartment, year);

  const {
    data: researcherData,
    isLoading: isResearcherLoading,
    error: researcherError,
  } = useFetchResearcherJournalDiversity(scholarId, year);

  const isLoading = scholarId ? isResearcherLoading : isAdminLoading;
  const data = scholarId ? researcherData : adminData;
  const error = scholarId ? researcherError : adminError;

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  const transformData = (data) => {
    if (!data) return [];
    return data.map((item) => ({
      name: item._id || 'Unknown',
      value: item.count,
    }));
  };

  const chartData = transformData(data);
  const totalJournals = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="journal-diversity-chart">
      <header>
        <h3>Journal Diversity</h3>
        <div className="chart-controls">
          <div className="selector">
            <label>
              Year:
              <select value={year} onChange={handleYearChange}>
                {[...Array(10).keys()].map((offset) => (
                  <option key={offset} value={currentYear - offset}>
                    {currentYear - offset}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="selector">
            <label>
              Chart Type:
              <select value={chartType} onChange={handleChartTypeChange}>
                <option value="Pie">Pie Chart</option>
              </select>
            </label>
          </div>
        </div>
      </header>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>Error loading data: {error.message}</p>
      ) : (
        chartType === 'Pie' && (
          <PieChartComponent
            data={chartData}
            title="Journal Diversity"
            subtitle={`${totalJournals}+ Journals included`}
          />
        )
      )}
    </div>
  );
};

export default JournalDiversityChart;
