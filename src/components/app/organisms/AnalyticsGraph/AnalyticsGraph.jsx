import { useState } from 'react';
import { useGetAnalyticsGraph } from '../../../../hooks/useAdminStatsHooks';
import { useGetDepartments } from '../../../../hooks/useAdminStatsHooks';
import { useDepartment } from '../../../../context/DepartmentContext';
import ChartComponent from './../../../common/ChartComponent/ChartComponent';
import transformData from '../../../../utils/transformData';
import './AnalyticsGraph.scss';

const AnalyticsGraph = () => {
  const { selectedDepartment, setSelectedDepartment } = useDepartment();
  const [criteria, setCriteria] = useState('totalPapers');
  const [chartType, setChartType] = useState('Line');
  const { data: departments, isLoading: isDepartmentsLoading } =
    useGetDepartments();
  const { data, isLoading, error } = useGetAnalyticsGraph(criteria);

  const chartData = data ? transformData(data) : [];

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
        <h3>Institute Analytics</h3>
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
              <p>Loading departments...</p>
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
        <p>Loading chart data...</p>
      ) : error ? (
        <p>Error loading chart data: {error.message}</p>
      ) : (
        <ChartComponent
          title={`Chart for ${criteria}`}
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
