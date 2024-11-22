import { useState, useMemo, useCallback } from 'react';
import { useGetTopPublications } from '../../../../hooks/useAdminStatsHooks';
import { useDepartment } from '../../../../context/DepartmentContext';
import { useGetPreFilterData } from '../../../../hooks/useAdminStatsHooks';
import './TopPublications.scss';

const TopPublications = () => {
  const { selectedDepartment } = useDepartment();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    year: [],
    journal: [],
    author: [],
    topic: [],
    sort: 'citations:desc',
    citationsRange: [0, 1000],
  });
  const [yearInput, setYearInput] = useState('');
  const [appliedFilters, setAppliedFilters] = useState(filters);

  const { data: preFilterData } = useGetPreFilterData(selectedDepartment);
  const { isLoading, data, error, isError } = useGetTopPublications(
    appliedFilters,
    selectedDepartment,
    page
  );

  const parseYearInput = (input) => {
    const years = new Set();
    const parts = input.split(',').map((part) => part.trim());

    parts.forEach((part) => {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        if (start && end && start <= end) {
          for (let year = start; year <= end; year++) {
            years.add(year);
          }
        }
      } else if (!isNaN(Number(part))) {
        years.add(Number(part));
      }
    });

    return Array.from(years).sort((a, b) => a - b);
  };

  const applyYearFilter = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      year: parseYearInput(yearInput),
    }));
  }, [yearInput]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;

    if (name === 'year') {
      setYearInput(value);
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value.split(',').map((item) => item.trim()),
      }));
    }
  }, []);

  const handleSortChange = useCallback((e) => {
    setFilters((prev) => ({
      ...prev,
      sort: e.target.value,
    }));
  }, []);

  const handleTableHeadingClick = (value) => {
    setFilters((prev) => {
      const updatedFilters = {
        ...prev,
        sort: value,
      };
      setAppliedFilters(updatedFilters);
      setPage(1);
      return updatedFilters;
    });
  };

  const handleCitationsRangeChange = useCallback((e) => {
    const [min, max] = e.target.value.split(',').map(Number);
    setFilters((prev) => ({
      ...prev,
      citationsRange: [min, max],
    }));
  }, []);

  const applyFilters = useCallback(() => {
    setAppliedFilters(filters);
    setPage(1);
  }, [filters]);

  const resetFilters = useCallback(() => {
    const defaultFilters = {
      year: [],
      journal: [],
      author: [],
      topic: [],
      sort: 'citations:desc',
      citationsRange: [0, 1000],
    };
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
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

  if (isLoading) {
    return <p>Loading top publications...</p>;
  }

  if (isError) {
    return <p>Error loading top publications: {error.message}</p>;
  }

  return (
    <div className="top-publications">
      <h3>Top Publications</h3>
      <p className="subtitle">
        {data?.publications?.length > 0
          ? `Page ${page} of ${data?.pagination?.pages || 1} — Showing ${data?.publications?.length} publications out of ${data?.pagination?.total || 0}`
          : 'No publications found.'}
      </p>

      <div className="filters">
        <label>
          <input
            type="text"
            placeholder="Enter years, e.g., 2021,2022-2024"
            name="year"
            value={yearInput}
            onChange={handleInputChange}
            onBlur={applyYearFilter}
            list="year-options"
          />
          {preFilterData && (
            <datalist id="year-options">
              {preFilterData[0]?.years
                ?.filter((year) => year)
                .map((year, index) => (
                  <option key={index} value={year} />
                ))}
            </datalist>
          )}
        </label>
        <label>
          <input
            type="text"
            placeholder="Enter journals, e.g., Nature,Science"
            name="journal"
            value={filters.journal.join(',')}
            onChange={handleInputChange}
            list="journal-options"
          />
          {preFilterData && (
            <datalist id="journal-options">
              {preFilterData[0]?.journals?.map((journal, index) => (
                <option key={index} value={journal} />
              ))}
            </datalist>
          )}
        </label>
        <label>
          <input
            type="text"
            placeholder="Enter authors, e.g., John Doe"
            name="author"
            value={filters.author.join(',')}
            onChange={handleInputChange}
            list="author-options"
          />
          {preFilterData && (
            <datalist id="author-options">
              {preFilterData[0]?.authors?.map((author, index) => (
                <option key={index} value={author} />
              ))}
            </datalist>
          )}
        </label>
        <label>
          <input
            type="text"
            placeholder="Enter topics, e.g., AI,ML"
            name="topic"
            value={filters.topic.join(',')}
            onChange={handleInputChange}
            list="topic-options"
          />
          {preFilterData && (
            <datalist id="topic-options">
              {preFilterData[0]?.topics?.map((topic, index) => (
                <option key={index} value={topic} />
              ))}
            </datalist>
          )}
        </label>
        <div className="selector">
          <label>
            <select
              name="sort"
              value={filters.sort}
              onChange={handleSortChange}
            >
              <option value="year:asc">Year Ascending</option>
              <option value="year:desc">Year Descending</option>
              <option value="title:asc">Title Ascending</option>
              <option value="title:desc">Title Descending</option>
              <option value="author:asc">Author Ascending</option>
              <option value="author:desc">Author Descending</option>
              <option value="citations:asc">Citations Ascending</option>
              <option value="citations:desc">Citations Descending</option>
            </select>
          </label>
        </div>
        <label>
          <input
            type="text"
            placeholder="Enter range, e.g., 0,100"
            value={filters.citationsRange.join(',')}
            onChange={handleCitationsRangeChange}
          />
        </label>
        <div className="filter-buttons">
          <button onClick={applyFilters}>Apply Filters</button>
          <button onClick={resetFilters}>Reset Filters</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th
              className={filters.sort.includes('title') ? 'active' : ''}
              onClick={() => handleTableHeadingClick('title:asc')}
            >
              Title
            </th>
            <th
              className={filters.sort.includes('year') ? 'active' : ''}
              onClick={() => handleTableHeadingClick('year:desc')}
            >
              Year
            </th>
            <th
              className={filters.sort.includes('citations') ? 'active' : ''}
              onClick={() => handleTableHeadingClick('citations:desc')}
            >
              Citations
            </th>
            <th
              className={filters.sort.includes('author') ? 'active' : ''}
              onClick={() => handleTableHeadingClick('author:asc')}
            >
              Author
            </th>
            <th>Co-authors</th>
            <th>Topics</th>
          </tr>
        </thead>
        <tbody>
          {data?.publications?.map((publication, index) => (
            <tr key={index}>
              <td>
                <a
                  href={publication.publicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {publication.title}
                </a>
              </td>
              <td>{publication.year}</td>
              <td>{publication.citations}</td>
              <td>{publication.author}</td>
              <td>{publication.coAuthors.join(', ') || 'N/A'}</td>
              <td>
                {publication.topics.length > 0
                  ? publication.topics.map((topic, i) => (
                      <span key={i} className="topic-tag">
                        {topic}
                      </span>
                    ))
                  : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderPagination()}
    </div>
  );
};

export default TopPublications;
