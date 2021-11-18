import React, { useContext, createContext, useReducer } from "react";

const LocalStorageContext = createContext({});

function parseLocalStorage() {
  const keyvalues = Object.keys(localStorage).map(key => [key,JSON.parse(localStorage.getItem(key))]);
  const defaults = {
    'launch-favourites': { ids: [] }
  };
  return keyvalues.length === 0
    ? defaults
    : {
      ...defaults,
      ...Object.assign(...keyvalues.map(([key, val]) => ({[key]: val})))
    };
}

export const LocalStorageContextProvider = ({ children }) => {
  const defaultState = parseLocalStorage();
  const [state, dispatch] = useReducer(localStorageStateReducer, defaultState)
  return (
    <LocalStorageContext.Provider value={{ state, dispatch }}>
      {children}
    </LocalStorageContext.Provider>
  );
};

export const useLocalStorageState = () => {
    return useContext(LocalStorageContext);
}

const localStorageStateReducer = (state, action) => {
    switch(action.type) {
        case "SET_DATA": {
            return {...state, [action.payload.key]: action.payload.data};
        }
        default: {
            return state;
        }
    }
}

