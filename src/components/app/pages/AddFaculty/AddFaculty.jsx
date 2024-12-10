import { Fragment, useEffect, useState } from 'react';
import { useBulkUploadResearchers } from '../../../../hooks/useAdminHooks';
import {
  useAddDepartments,
  useAddResearcher,
} from '../../../../hooks/useAdminHooks';
import './AddFaculty.scss';

const AddFaculty = () => {
  const [file, setFile] = useState(null);
  const [researcherData, setResearcherData] = useState({
    scholar_id: '',
    email: '',
    department: '',
    positions: [
      { start: '', end: '', position: '', institute: '', current: false },
    ],
    gender: '',
  });
  const [departmentName, setDepartmentName] = useState('');
  const { bulkUploadResearchers, isLoading, isSuccess, isError, error } =
    useBulkUploadResearchers();
  const {
    addDepartments,
    isLoading: isAddingDepartment,
    isSuccess: isDepartmentSuccess,
    isError: isDepartmentError,
    error: departmentError,
  } = useAddDepartments();
  const {
    addResearcher,
    isLoading: isAddingResearcher,
    isSuccess: isResearcherSuccess,
    isError: isResearcherError,
    error: researcherError,
  } = useAddResearcher();

  useEffect(() => {
    console.log('researcherData', researcherData);
  }, [researcherData]);

  const formatDateToDDMMYYYY = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const formatPositionsDates = (positions) => {
    return positions.map((position) => {
      if (position.start) {
        position.start = formatDateToDDMMYYYY(position.start);
      }
      if (position.end) {
        position.end = formatDateToDDMMYYYY(position.end);
      }
      return position;
    });
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      droppedFile.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      setFile(droppedFile);
    } else {
      alert('Please upload a valid Excel file.');
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      selectedFile.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      setFile(selectedFile);
    } else {
      alert('Please upload a valid Excel file.');
    }
  };

  // Handle bulk upload submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      bulkUploadResearchers(file);
    } else {
      alert('Please upload a file first.');
    }
  };

  // Handle adding a researcher
  const handleAddResearcher = () => {
    if (
      researcherData.scholar_id &&
      researcherData.email &&
      researcherData.department
    ) {
      const formattedPositions = formatPositionsDates(researcherData.positions);

      const payload = {
        ...researcherData,
        positions: formattedPositions,
      };

      addResearcher(payload);
      setResearcherData({
        scholar_id: '',
        email: '',
        department: '',
        positions: [
          { start: '', end: '', position: '', institute: '', current: false },
        ],
        gender: '',
      });
    } else {
      alert('Please fill in all required fields.');
    }
  };

  // Handle adding a department
  const handleAddDepartment = () => {
    if (departmentName.trim()) {
      addDepartments([departmentName]);
      setDepartmentName('');
    } else {
      alert('Please enter a valid department name.');
    }
  };

  // Handle researcher form field changes
  const handleResearcherChange = (e) => {
    const { name, value } = e.target;
    setResearcherData({ ...researcherData, [name]: value });
  };

  // Handle position field changes
  const handlePositionChange = (index, field, value) => {
    const updatedPositions = [...researcherData.positions];
    updatedPositions[index][field] = value;
    setResearcherData({ ...researcherData, positions: updatedPositions });
  };

  // Add a new position
  const addPosition = () => {
    setResearcherData({
      ...researcherData,
      positions: [
        ...researcherData.positions,
        { start: '', end: '', position: '', institute: '', current: false },
      ],
    });
  };

  // Remove a position
  const removePosition = (index) => {
    const updatedPositions = researcherData.positions.filter(
      (_, i) => i !== index
    );
    setResearcherData({ ...researcherData, positions: updatedPositions });
  };

  return (
    <Fragment>
      <div className="add-researcher-container">
        <h3>Add Individual Researcher</h3>
        <p className="subtitle">
          Add a single researcher by filling out the fields below.
        </p>
        <div className="researcher-form">
          <input
            type="text"
            placeholder="Scholar ID or Profile URL"
            name="scholar_id"
            value={researcherData.scholar_id}
            onChange={handleResearcherChange}
            className="researcher-input"
          />
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={researcherData.email}
            onChange={handleResearcherChange}
            className="researcher-input"
          />
          <input
            type="text"
            placeholder="Department"
            name="department"
            value={researcherData.department}
            onChange={handleResearcherChange}
            className="researcher-input"
          />
          <select
            name="gender"
            value={researcherData.gender}
            onChange={handleResearcherChange}
            className="researcher-input"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {/* Positions Section */}
          <div className="positions-container">
            <h4>Positions</h4>
            {researcherData.positions.map((position, index) => (
              <div key={index} className="position-entry">
                <input
                  type="date"
                  placeholder="Start Date"
                  value={position.start}
                  onChange={(e) =>
                    handlePositionChange(index, 'start', e.target.value)
                  }
                  className="position-input"
                />
                <input
                  type="date"
                  placeholder="End Date"
                  value={position.end}
                  onChange={(e) =>
                    handlePositionChange(index, 'end', e.target.value)
                  }
                  className="position-input"
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={position.position}
                  onChange={(e) =>
                    handlePositionChange(index, 'position', e.target.value)
                  }
                  className="position-input"
                />
                <input
                  type="text"
                  placeholder="Institute"
                  value={position.institute}
                  onChange={(e) =>
                    handlePositionChange(index, 'institute', e.target.value)
                  }
                  className="position-input"
                />
                <label>
                  <input
                    type="checkbox"
                    checked={position.current}
                    onChange={(e) =>
                      handlePositionChange(index, 'current', e.target.checked)
                    }
                  />
                  Current Position
                </label>
                <button
                  onClick={() => removePosition(index)}
                  className="remove-position-button"
                >
                  Remove
                </button>
              </div>
            ))}
            <button onClick={addPosition} className="add-position-button">
              Add Position
            </button>
          </div>

          <button
            className="add-researcher-button"
            onClick={handleAddResearcher}
            disabled={isAddingResearcher}
          >
            {isAddingResearcher ? 'Adding...' : 'Add Researcher'}
          </button>
        </div>
        {isResearcherSuccess && (
          <p className="success-message">Researcher added successfully!</p>
        )}
        {isResearcherError && (
          <p className="error-message">
            Error adding researcher: {researcherError.message}
          </p>
        )}
      </div>

      <div className="add-department-container">
        <h3>Add Department</h3>
        <p className="subtitle">Add a new department to your organization.</p>
        <div className="department-input-container">
          <input
            type="text"
            placeholder="Enter department name"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            className="department-input"
          />
          <button
            className="add-department-button"
            onClick={handleAddDepartment}
            disabled={isAddingDepartment}
          >
            {isAddingDepartment ? 'Adding...' : 'Add Department'}
          </button>
        </div>
        {isDepartmentSuccess && (
          <p className="success-message">Department added successfully!</p>
        )}
        {isDepartmentError && (
          <p className="error-message">
            Error adding department: {departmentError.message}
          </p>
        )}
      </div>

      <div className="add-faculty-container">
        <h3>Add Faculty</h3>
        <p className="subtitle">
          Drag and drop an Excel file or select one to upload faculty members in
          bulk.
        </p>

        <div
          className="drag-drop-area"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <p>Drag and drop your Excel file here</p>
          <p>or</p>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>

        {file && (
          <p className="file-name">
            Selected File: <span>{file.name}</span>
          </p>
        )}

        <button
          className="upload-button"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>

        {isSuccess && (
          <p className="success-message">Faculty uploaded successfully!</p>
        )}
        {isError && (
          <p className="error-message">Error during upload: {error.message}</p>
        )}
      </div>
    </Fragment>
  );
};

export default AddFaculty;
