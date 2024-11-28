import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetAllResearchers } from '../../../../hooks/useAdminHooks';
import { useGetDepartments } from '../../../../hooks/useAdminStatsHooks';
import { useDepartment } from '../../../../context/DepartmentContext';
import Spinner from '../../../common/Spinner/Spinner';
import './AllResearchers.scss';

const AllResearchers = () => {
  const { selectedDepartment, setSelectedDepartment } = useDepartment();
  const [filters, setFilters] = useState({
    department: selectedDepartment || '',
    gender: '',
    sort: 'name',
  });
  const [page, setPage] = useState(1);
  const [researchers, setResearchers] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { data: departmentData } = useGetDepartments();
  const { isLoading, data, error } = useGetAllResearchers({
    ...filters,
    page,
    limit: 10,
  });

  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      department: selectedDepartment || '',
    }));
    setPage(1);
    setResearchers([]);
  }, [selectedDepartment]);

  useEffect(() => {
    if (data?.researchers) {
      if (page === 1) {
        setResearchers(data.researchers);
      } else {
        setResearchers((prev) => [...prev, ...data.researchers]);
      }
      setHasMore(page < data.pagination.pages);
    }
  }, [data, page]);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, isLoading]);

  const handleDepartmentChange = (e) => {
    const value = e.target.value;
    setSelectedDepartment(value);
    setFilters((prev) => ({
      ...prev,
      department: value,
    }));
    setPage(1);
    setResearchers([]);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPage(1);
    setResearchers([]);
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    setFilters((prev) => ({
      ...prev,
      sort: value,
    }));
    setPage(1);
    setResearchers([]);
  };

  const resetFilters = () => {
    setFilters((prev) => ({
      ...prev,
      gender: '',
      sort: 'name',
    }));
    setPage(1);
  };

  if (error) return <p>Error loading researchers: {error.message}</p>;

  return (
    <div className="all-researchers">
      <h3>All Researchers</h3>
      <div className="filters">
        <label>
          Department:
          <select
            name="department"
            value={filters.department}
            onChange={handleDepartmentChange}
          >
            <option value="">All</option>
            {departmentData?.departments?.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
        </label>
        <label>
          Gender:
          <select
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          Sort:
          <select name="sort" value={filters.sort} onChange={handleSortChange}>
            <option value="name">Name Ascending</option>
            <option value="-name">Name Descending</option>
            <option value="hIndex">H-Index Ascending</option>
            <option value="-hIndex">H-Index Descending</option>
            <option value="iIndex">i-Index Ascending</option>
            <option value="-iIndex">i-Index Descending</option>
            <option value="totalPapers">Total Papers Ascending</option>
            <option value="-totalPapers">Total Papers Descending</option>
          </select>
        </label>
        <button onClick={resetFilters}>Reset Filters</button>
      </div>
      <div className="researcher-cards">
        {researchers.map((researcher, index) => (
          <div key={index} className="researcher-card">
            <div className="researcher-avatar">
              <a
                href={`https://scholar.google.co.in/citations?user=${researcher.scholar_id}&hl=en`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=${researcher.scholar_id}`}
                  alt={`Avatar of ${researcher.name}`}
                />
              </a>
            </div>
            <div className="researcher-info">
              <a
                href={
                  window.location.origin +
                  `/researcher/${researcher.scholar_id}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4>{researcher.name}</h4>
              </a>
              <p>{researcher.department}</p>
              <div className="stats">
                <p>H-Index: {researcher.h_index}</p>
                <p>i10-Index: {researcher.i_index}</p>
                <p>Total Papers: {researcher.totalPapers}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isLoading && <Spinner />}
      <div ref={ref}></div>
    </div>
  );
};

export default AllResearchers;
