import { Fragment, useEffect } from 'react';
import './Home.scss';
import AnalyticsGraph from '../../organisms/AnalyticsGraph/AnalyticsGraph';
import StatsCards from '../../organisms/StatsCards/StatsCards';
import TopResearchers from '../../organisms/TopResearchers/TopResearchers';
import ResearchTopicsChart from '../../organisms/ResearchTopicsChart/ResearchTopicsChart';
import JournalDiversityChart from '../../organisms/JournalDiversityChart/JournalDiversityChart';
import TopPublications from '../../organisms/TopPublications/TopPublications';
import { useMainHome } from '../../../../context/MainHomeContext';

const Home = () => {
  const { setMainHomeContent } = useMainHome();

  useEffect(() => {
    const home = document.querySelector('.main-home');
    if (home) {
      setMainHomeContent(home.outerHTML);
    }
  }, []);

  return (
    <Fragment>
      <div className="main-home">
        <StatsCards />
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
