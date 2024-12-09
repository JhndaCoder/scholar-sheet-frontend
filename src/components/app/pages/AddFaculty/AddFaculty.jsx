import { Fragment, useState } from 'react';
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
    positions: [{ start: '', end: '', position: '', institute: '' }],
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
      addResearcher(researcherData);
      setResearcherData({
        scholar_id: '',
        email: '',
        department: '',
        positions: [{ start: '', end: '', position: '', institute: '' }],
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

  const handleResearcherChange = (e) => {
    const { name, value } = e.target;
    setResearcherData({ ...researcherData, [name]: value });
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
