import { Fragment } from 'react';
import './Researcher.scss';
import AnalyticsGraph from '../../organisms/AnalyticsGraph/AnalyticsGraph';
import StatsCards from '../../organisms/StatsCards/StatsCards';
import TopResearchers from '../../organisms/TopResearchers/TopResearchers';
import ResearchTopicsChart from '../../organisms/ResearchTopicsChart/ResearchTopicsChart';
import JournalDiversityChart from '../../organisms/JournalDiversityChart/JournalDiversityChart';
import TopPublications from '../../organisms/TopPublications/TopPublications';
import YearRangeStats from '../../organisms/YearRangeStats/YearRangeStats';
import { useParams } from 'react-router-dom';
import ResearcherHeader from '../../organisms/ResearcherHeader/ResearcherHeader';

const Researcher = () => {
  const { id } = useParams();
  return (
    <Fragment>
      <div className="researcher-container-main">
        <ResearcherHeader scholarId={id} />
        <StatsCards scholarId={id} />
        <YearRangeStats scholarId={id} />
        <AnalyticsGraph scholarId={id} />
        <TopResearchers />
        <ResearchTopicsChart />
        <JournalDiversityChart />
        <TopPublications />
      </div>
    </Fragment>
  );
};

export default Researcher;
