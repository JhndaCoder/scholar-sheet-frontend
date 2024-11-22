import { createContext, useContext, useState } from 'react';

const MainHomeContext = createContext();

export const MainHomeProvider = ({ children }) => {
  const [mainHomeContent, setMainHomeContent] = useState(null);

  return (
    <MainHomeContext.Provider value={{ mainHomeContent, setMainHomeContent }}>
      {children}
    </MainHomeContext.Provider>
  );
};

export const useMainHome = () => useContext(MainHomeContext);
