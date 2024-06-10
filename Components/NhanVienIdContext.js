import {StyleSheet, Text, View} from 'react-native';
import React, {createContext, useContext, useState} from 'react';
const IdContext = createContext();
export const NhanVienIdContext = ({children}) => {
  const [userId, setUserId] = useState(null);

  return (
    <IdContext.Provider value={{userId, setUserId}}>
      {children}
    </IdContext.Provider>
  );
};

export const useUserId = () => useContext(IdContext);
