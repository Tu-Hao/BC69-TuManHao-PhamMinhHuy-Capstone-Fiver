import React, { createContext, useContext, useState, ReactNode } from "react";

interface Data {
    maChiTietCV: number;
}

interface DataContextType {
  data: Data | null;
  setData: React.Dispatch<React.SetStateAction<Data | null>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<Data | null>(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
