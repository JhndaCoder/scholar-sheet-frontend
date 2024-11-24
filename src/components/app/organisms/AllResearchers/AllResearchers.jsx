import { useState, useMemo, useCallback } from 'react';
import { useGetAllResearchers } from '../../../../hooks/useAdminHooks'; // Replace with correct path
import { useGetDepartments } from '../../../../hooks/useAdminStatsHooks'; // Replace with correct path
import './AllResearchers.scss'; // Replace with correct path for your styles

const AllResearchers = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    department: '',
    gender: '',
    sort: 'name:asc',
  });

  const { data: departmentData } = useGetDepartments();
  const { isLoading, data, error, isError } = useGetAllResearchers({
    ...filters,
    page,
    limit: 10, // Adjust the limit as needed
  });

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSortChange = useCallback((e) => {
    setFilters((prev) => ({
      ...prev,
      sort: e.target.value,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      department: '',
      gender: '',
      sort: 'name:asc',
    });
    setPage(1);
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const pagination = useMemo(() => {
    const totalPages = data?.pagination?.pages || 1;
    const maxButtons = 5;
    let startPage = Math.max(1, page - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    return { totalPages, startPage, endPage };
  }, [data, page]);

  const renderPagination = () => (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => handlePageChange(1)}>
        First
      </button>
      <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
        Previous
      </button>
      {Array.from(
        { length: pagination.endPage - pagination.startPage + 1 },
        (_, i) => i + pagination.startPage
      ).map((num) => (
        <button
          key={num}
          className={num === page ? 'active' : ''}
          onClick={() => handlePageChange(num)}
        >
          {num}
        </button>
      ))}
      <button
        disabled={page === pagination.totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
      <button
        disabled={page === pagination.totalPages}
        onClick={() => handlePageChange(pagination.totalPages)}
      >
        Last
      </button>
    </div>
  );

  if (isLoading) return <p>Loading researchers...</p>;
  if (isError) return <p>Error loading researchers: {error.message}</p>;

  return (
    <div className="all-researchers">
      <h3>All Researchers</h3>
      <div className="filters">
        <label>
          Department:
          <select
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
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
          <select
            name="sort"
            value={filters.sort}
            onChange={handleSortChange}
          >
            <option value="name:asc">Name Ascending</option>
            <option value="name:desc">Name Descending</option>
            <option value="hIndex:asc">H-Index Ascending</option>
            <option value="hIndex:desc">H-Index Descending</option>
            <option value="iIndex:asc">i-Index Ascending</option>
            <option value="iIndex:desc">i-Index Descending</option>
            <option value="totalPapers:asc">Total Papers Ascending</option>
            <option value="totalPapers:desc">Total Papers Descending</option>
          </select>
        </label>
        <button onClick={resetFilters}>Reset Filters</button>
      </div>
      <div className="researcher-cards">
        {data?.researchers?.map((researcher, index) => (
          <div key={index} className="researcher-card">
            <div className="researcher-avatar">
              <img
                src={`https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=${researcher.scholar_id}`}
                alt={`Avatar of ${researcher.name}`}
              />
            </div>
            <div className="researcher-info">
              <h4>{researcher.name}</h4>
              <p>{researcher.department}</p>
              <p>
                H-Index: {researcher.h_index}, i10-Index: {researcher.i_index}
              </p>
              <p>Total Papers: {researcher.totalPapers}</p>
            </div>
          </div>
        ))}
      </div>
      {renderPagination()}
    </div>
  );
};

export default AllResearchers;
