import { useFetchResearcherProfile } from '../../../../hooks/useResearcherStatsHooks';
import Spinner from '../../../common/Spinner/Spinner';
import './ResearcherHeader.scss';

const ResearcherHeader = ({ scholarId }) => {
  const { isLoading, data, error } = useFetchResearcherProfile(scholarId);

  if (isLoading) {
    return <Spinner radius="3rem" />;
  }

  if (error) {
    return <p>Error loading researcher profile: {error.message}</p>;
  }

  const { name, email, department, admin_id: { institute_name } = {} } = data;

  const tags = ['Machine Learning', 'Soft Computing', 'Data Mining'];

  return (
    <div className="researcher-header-container">
      <div className="researcher-header-left">
        <img
          src={`https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=${scholarId}`}
          alt={`${name}`}
          className="researcher-photo"
        />
      </div>
      <div className="researcher-header-right">
        <h2 className="researcher-name">{name}</h2>
        <p className="researcher-position">Department of {department}</p>
        <p className="researcher-affiliation">{institute_name}</p>
        <p className="researcher-email">Verified email at {email}</p>
        <div className="researcher-tags">
          {tags &&
            tags.map((tag, index) => (
              <span key={index} className="researcher-tag">
                {tag}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ResearcherHeader;
