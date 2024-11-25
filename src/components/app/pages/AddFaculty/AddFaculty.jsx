import { Fragment, useState } from 'react';
import Form from '../../molecules/Form/Form';
import Input from '../../../common/Input/Input';
import { useAddResearcher } from '../../../../hooks/useAdminHooks';
import './AddFaculty.scss';

const InputFieldData = [
  {
    name: 'scholar_id',
    placeholder: 'Scholar ID or Profile URL',
    autoComplete: 'off',
    'aria-label': 'Scholar ID',
  },
  {
    name: 'email',
    placeholder: 'Email Address',
    type: 'email',
    autoComplete: 'email',
    'aria-label': 'Email Address',
  },
  {
    name: 'department',
    placeholder: 'Department',
    autoComplete: 'organization-title',
    'aria-label': 'Department',
  },
  {
    name: 'positions',
    type: 'group',
    fields: [
      {
        name: 'start',
        placeholder: 'Start Date',
        type: 'date',
        autoComplete: 'off',
        'aria-label': 'Start Date',
      },
      {
        name: 'end',
        placeholder: 'End Date',
        type: 'date',
        autoComplete: 'off',
        'aria-label': 'End Date',
      },
      {
        name: 'position',
        placeholder: 'Position',
        autoComplete: 'organization-title',
        'aria-label': 'Position',
      },
      {
        name: 'institute',
        placeholder: 'Institute Name',
        autoComplete: 'organization',
        'aria-label': 'Institute Name',
      },
    ],
  },
  {
    name: 'gender',
    placeholder: 'Gender',
    type: 'select',
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' },
    ],
    'aria-label': 'Gender',
  },
];

const AddFaculty = () => {
  const [formData, setFormData] = useState({
    scholar_id: '',
    email: '',
    department: '',
    positions: [{ start: '', end: '', position: '', institute: '' }],
    gender: '',
  });

  const { addResearcher, isLoading, isError, error, isSuccess } =
    useAddResearcher();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'scholar_id') {
      const urlPattern = /user=([^&]+)/;
      const match = value.match(urlPattern);
      setFormData({
        ...formData,
        [name]: match ? match[1] : value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handlePositionChange = (index, field, value) => {
    const updatedPositions = [...formData.positions];
    updatedPositions[index][field] = value;
    setFormData({ ...formData, positions: updatedPositions });
  };

  const handleAddPosition = () => {
    setFormData({
      ...formData,
      positions: [
        ...formData.positions,
        { start: '', end: '', position: '', institute: '' },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addResearcher(formData);
  };

  return (
    <Fragment>
      <div className="add-faculty-container-main">
        <Form
          title="Add Faculty"
          subTitle="Add faculty members to your department"
          buttonText={isLoading ? 'Adding...' : 'Add Faculty'}
          onSubmit={handleSubmit}
        >
          {InputFieldData.map((inputField, index) => {
            if (inputField.type === 'group') {
              return (
                <div key={index} className="position-group">
                  <h4>{inputField.placeholder}</h4>
                  {formData.positions.map((position, positionIndex) => (
                    <div key={positionIndex} className="position-fields">
                      {inputField.fields.map((field, fieldIndex) => (
                        <Input
                          key={fieldIndex}
                          name={field.name}
                          placeholder={field.placeholder}
                          type={field.type}
                          value={
                            formData.positions[positionIndex][field.name] || ''
                          }
                          onChange={(e) =>
                            handlePositionChange(
                              positionIndex,
                              field.name,
                              e.target.value
                            )
                          }
                          {...field}
                        />
                      ))}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-position-button"
                    onClick={handleAddPosition}
                  >
                    Add Position
                  </button>
                </div>
              );
            } else if (inputField.type === 'select') {
              return (
                <select
                  key={index}
                  name={inputField.name}
                  value={formData[inputField.name]}
                  onChange={handleChange}
                  aria-label={inputField['aria-label']}
                >
                  <option value="">{inputField.placeholder}</option>
                  {inputField.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              );
            } else {
              return (
                <Input
                  key={index}
                  onChange={handleChange}
                  value={formData[inputField.name] || ''}
                  {...inputField}
                />
              );
            }
          })}
        </Form>
        {isSuccess && (
          <p style={{ color: 'green' }}>Faculty added successfully!</p>
        )}
        {isError && (
          <p style={{ color: 'red' }}>Error adding faculty: {error.message}</p>
        )}
      </div>
    </Fragment>
  );
};

export default AddFaculty;
