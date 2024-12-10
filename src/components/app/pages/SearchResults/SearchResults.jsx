import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSearchResearcher } from '../../../../hooks/useSearchHooks';
import Spinner from '../../../common/Spinner/Spinner';
import './SearchResults.scss';

const SearchResults = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, error, isError } = useSearchResearcher(query);

  useEffect(() => {
    if (!query || query.trim() === '') {
      navigate('/home');
    }
  }, [query, navigate]);

  const handleResearcherClick = (scholarId) => {
    window.open(`/researcher/${scholarId}`, '_blank');
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="search-results error">
        <p>Error searching researchers: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <h3>Possible Search Results</h3>
      <p className="subtitle">
        {data?.length || 0} researchers found for {query}
      </p>

      {data?.length > 0 ? (
        <div className="results-grid">
          {data.map((researcher) => (
            <div
              key={researcher.scholar_id}
              className="researcher-card"
              onClick={() => handleResearcherClick(researcher.scholar_id)}
            >
              <div className="researcher-image">
                <img
                  src={`https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=${researcher.scholar_id}`}
                  alt={researcher.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-profile.png';
                  }}
                />
              </div>
              <div className="researcher-details">
                <h4>{researcher.name}</h4>
                <p className="department">
                  {researcher.department.toUpperCase()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No researchers found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
