import { createContext, useState, useContext } from 'react';

const DepartmentContext = createContext();

export const DepartmentProvider = ({ children }) => {
  const [selectedDepartment, setSelectedDepartment] = useState('');

  return (
    <DepartmentContext.Provider
      value={{ selectedDepartment, setSelectedDepartment }}
    >
      {children}
    </DepartmentContext.Provider>
  );
};

export const useDepartment = () => useContext(DepartmentContext);
