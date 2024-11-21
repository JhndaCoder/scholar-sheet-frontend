import { useGetCardStats } from './../../../../hooks/useAdminStatsHooks';
import { useFetchResearcherCardStats } from '../../../../hooks/useResearcherStatsHooks';
import { useParams } from 'react-router-dom';
import './StatsCards.scss';

const StatsCards = () => {
  const { scholarId } = useParams();
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

  if (isLoading) return <p>Loading stats...</p>;
  if (error) return <p>Error loading stats: {error.message}</p>;

  const { citations, publications, totalResearchers } = data;

  return (
    <div className="stats-cards">
      <div className="card">
        <div className="card-header">
          <span className="material-symbols-outlined icon">format_quote</span>
          <p
            className={`growth ${citations.growth.includes('decrease') ? 'negative' : 'positive'}`}
          >
            {citations.growth}
          </p>
        </div>
        <h4>Total Citations</h4>
        <p className="card-value">{citations['2024']}</p>
        <p className="card-subtext">compared to {citations['2023']} in 2023</p>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="material-symbols-outlined icon">library_books</span>
          <p
            className={`growth ${publications.growth.includes('decrease') ? 'negative' : 'positive'}`}
          >
            {publications.growth}
          </p>
        </div>
        <h4>Total Publications</h4>
        <p className="card-value">{publications['2024']}</p>
        <p className="card-subtext">
          compared to {publications['2023']} in 2023
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="material-symbols-outlined icon">group</span>
        </div>
        <h4>Total Researchers</h4>
        <p className="card-value">{totalResearchers}</p>
        <p className="card-subtext">compared to last year</p>
      </div>
    </div>
  );
};

export default StatsCards;
