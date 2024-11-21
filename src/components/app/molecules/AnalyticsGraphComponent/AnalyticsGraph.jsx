import ChartComponent from '../../../common/ChartComponent/ChartComponent';
import { useGetAnalyticsGraph } from '../../../../hooks/useAdminStatsHooks';
import transformData from '../../../../utils/transformData';

const AnalyticsGraphPage = ({ department, criteria, title }) => {
  const { data, isLoading, error } = useGetAnalyticsGraph(department, criteria);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data.</div>;
  }

  const chartData = transformData(data);

  return (
    <ChartComponent
      title={title}
      data={chartData}
      dataKeys={['value']}
      lineColors={['#3099EA']}
    />
  );
};

export default AnalyticsGraphPage;
