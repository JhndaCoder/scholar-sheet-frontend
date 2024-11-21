import { useDepartment } from '../../../../context/DepartmentContext.jsx';
import { useGetDepartments } from '../../../../hooks/useAdminStatsHooks.jsx';
import './DepartmentSelector.scss';

const DepartmentSelector = () => {
  const { selectedDepartment, setSelectedDepartment } = useDepartment();
  const { data: departments, isLoading } = useGetDepartments();

  const handleChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  return (
    <div className="department-selector">
      <label>
        {isLoading ? (
          <p>Loading departments...</p>
        ) : (
          <select value={selectedDepartment} onChange={handleChange}>
            <option value="">All Departments</option>
            {departments?.departments?.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        )}
      </label>
    </div>
  );
};

export default DepartmentSelector;
