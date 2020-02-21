/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useReducer} from 'react';
import locations from './locations';

const initialState = {
  locations: [],
  selectedLocation: undefined,
};

export const actions = {
  SET_LOCATIONS: Symbol(),
  SET_SELECTED_LOCATION: Symbol(),
};

const reducer = (state, action) => {
  switch (action.action) {
    case actions.SET_LOCATIONS:
      return {...state, locations: action.payload};

    case actions.SET_SELECTED_LOCATION:
      return {...state, selectedLocation: action.payload};

    default:
      console.warn('Unknown action: ', action);
      return state;
  }
};

export const LocationsContext = React.createContext(null);

const LocationsHydrator = () => {
  const [, locationsDispatch] = useContext(LocationsContext);

  useEffect(() => {
    locationsDispatch({
      action: actions.SET_LOCATIONS,
      payload: locations,
    })
  }, []);

  return null;
};

const LocationsContextProvider = ({children}) => (
  <LocationsContext.Provider value={useReducer(reducer, initialState)}>
    <LocationsHydrator/>
    {children}
  </LocationsContext.Provider>
);

export default LocationsContextProvider;
