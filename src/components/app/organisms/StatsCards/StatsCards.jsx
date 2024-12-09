import { useGetCardStats } from './../../../../hooks/useAdminStatsHooks';
import { useFetchResearcherCardStats } from '../../../../hooks/useResearcherStatsHooks';
import Spinner from '../../../common/Spinner/Spinner';
import './StatsCards.scss';

const StatCard = ({ isLoading, icon, growth, title, value, subtext }) => {
  return (
    <div className="card">
      {isLoading ? (
        <Spinner radius="3rem" />
      ) : (
        <>
          <div className="card-header">
            <span className="material-symbols-outlined icon">{icon}</span>
            {growth && (
              <p
                className={`growth ${growth.includes('decrease') ? 'negative' : 'positive'}`}
              >
                {growth}
              </p>
            )}
          </div>
          <h4>{title}</h4>
          <p className="card-value">{value}</p>
          <p className="card-subtext">{subtext}</p>
        </>
      )}
    </div>
  );
};

const StatsCards = ({ scholarId }) => {
  const {
    data: generalData,
    isLoading: isGeneralLoading,
    error: generalError,
  } = useGetCardStats();
  const {
    data: researcherData,
    isLoading: isResearcherLoading,
    error: researcherError,
  } = useFetchResearcherCardStats(scholarId);

  const isLoading = scholarId ? isResearcherLoading : isGeneralLoading;
  const data = scholarId ? researcherData : generalData;
  const error = scholarId ? researcherError : generalError;

  if (error) return <p>Error loading stats: {error.message}</p>;

  const citations = data?.citations || {};
  const publications = data?.publications || {};
  const totalResearchers = data?.totalResearchers || null;
  const totalPapers = data?.totalPapers || null;

  return (
    <div className="stats-cards">
      <StatCard
        isLoading={isLoading}
        icon="format_quote"
        growth={citations.growth}
        title="Total Citations"
        value={citations['2024']}
        subtext={`compared to ${citations['2023']} in 2023`}
      />
      <StatCard
        isLoading={isLoading}
        icon="library_books"
        growth={publications.growth}
        title="Total Publications"
        value={publications['2024']}
        subtext={`compared to ${publications['2023']} in 2023`}
      />
      {scholarId ? (
        <StatCard
          isLoading={isLoading}
          icon="docs"
          title="Total Publications till now"
          value={totalPapers}
        ></StatCard>
      ) : (
        <StatCard
          isLoading={isLoading}
          icon="group"
          title="Total Researchers"
          value={totalResearchers}
        />
      )}
    </div>
  );
};

export default StatsCards;
