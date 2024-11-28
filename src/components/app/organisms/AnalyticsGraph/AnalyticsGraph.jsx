import { useState, useMemo } from 'react';
import { useGetAnalyticsGraph } from '../../../../hooks/useAdminStatsHooks';
import { useGetDepartments } from '../../../../hooks/useAdminStatsHooks';
import { useFetchResearcherAnalyticsGraph } from '../../../../hooks/useResearcherStatsHooks';
import { useDepartment } from '../../../../context/DepartmentContext';
import ChartComponent from './../../../common/ChartComponent/ChartComponent';
import transformData from '../../../../utils/transformData';
import './AnalyticsGraph.scss';
import Spinner from '../../../common/Spinner/Spinner';

const AnalyticsGraph = ({ scholarId }) => {
  const { selectedDepartment, setSelectedDepartment } = useDepartment();

  const [criteria, setCriteria] = useState('totalPapers');
  const [chartType, setChartType] = useState('Line');

  const { data: departments, isLoading: isDepartmentsLoading } =
    useGetDepartments();

  const {
    data: researcherData,
    isLoading: isResearcherLoading,
    error: researcherError,
  } = useFetchResearcherAnalyticsGraph(scholarId, criteria);

  const {
    data: generalData,
    isLoading: isGeneralLoading,
    error: generalError,
  } = useGetAnalyticsGraph(criteria);

  const isLoading = scholarId ? isResearcherLoading : isGeneralLoading;
  const data = scholarId ? researcherData : generalData;
  const error = scholarId ? researcherError : generalError;

  const chartData = useMemo(() => (data ? transformData(data) : []), [data]);

  const handleCriteriaChange = (e) => {
    setCriteria(e.target.value);
  };

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  return (
    <div className="analytics-dashboard">
      <header>
        <h3>{scholarId ? 'Researcher Analytics' : 'Institute Analytics'}</h3>
        <div className="controls">
          <label>
            <select value={chartType} onChange={handleChartTypeChange}>
              <option value="Line">Line Chart</option>
              <option value="Bar">Bar Chart</option>
            </select>
          </label>

          <label>
            <select value={criteria} onChange={handleCriteriaChange}>
              <option value="totalPapers">Total Papers</option>
              <option value="totalCitations">Total Citations</option>
            </select>
          </label>

          <label>
            {isDepartmentsLoading ? (
              <Spinner small={true} />
            ) : (
              <select
                value={selectedDepartment}
                onChange={handleDepartmentChange}
              >
                <option value="">All Departments</option>
                {departments?.departments?.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            )}
          </label>
        </div>
      </header>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>Error loading chart data: {error.message}</p>
      ) : (
        <ChartComponent
          title={`${criteria === 'totalPapers' ? 'Papers' : 'Citations'} ${
            scholarId ? 'for Researcher' : 'Institute-wide'
          }`}
          data={chartData}
          dataKeys={['value']}
          lineColors={['#3099EA']}
          chartType={chartType}
        />
      )}
    </div>
  );
};

export default AnalyticsGraph;
