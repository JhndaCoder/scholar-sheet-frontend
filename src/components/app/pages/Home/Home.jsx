import { Fragment } from 'react';
import './Home.scss';
import AnalyticsGraph from '../../organisms/AnalyticsGraph/AnalyticsGraph';
import StatsCards from '../../organisms/StatsCards/StatsCards';
import TopResearchers from '../../organisms/TopResearchers/TopResearchers';
import ResearchTopicsChart from '../../organisms/ResearchTopicsChart/ResearchTopicsChart';
import JournalDiversityChart from '../../organisms/JournalDiversityChart/JournalDiversityChart';
import TopPublications from '../../organisms/TopPublications/TopPublications';
import YearRangeStats from '../../organisms/YearRangeStats/YearRangeStats';

const Home = () => {
  return (
    <Fragment>
      <div className="main-home">
        <StatsCards />
        <YearRangeStats />
        <AnalyticsGraph />
        <TopResearchers />
        <ResearchTopicsChart />
        <JournalDiversityChart />
        <TopPublications />
      </div>
    </Fragment>
  );
};

export default Home;
