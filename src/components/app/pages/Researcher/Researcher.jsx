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

  const researcherData = {
    imageSrc: `https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=${id}`,
    name: 'Prashant Singh Rana',
    position: 'Associate Professor, Computer Science & Engineering Dept.',
    affiliation: 'Thapar Institute of Engg. & Tech, Patiala',
    email: 'thapar.edu',
    tags: [
      'Machine Learning',
      'Soft Computing',
      'Data Mining',
      'Combinatorial Problems',
      'Bioinformatics',
    ],
  };

  return (
    <Fragment>
      <div className="researcher-container-main">
        <ResearcherHeader
          imageSrc={researcherData.imageSrc}
          name={researcherData.name}
          position={researcherData.position}
          affiliation={researcherData.affiliation}
          email={researcherData.email}
          tags={researcherData.tags}
        />
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
