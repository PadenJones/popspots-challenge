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
  switch (action.type) {
    case actions.SET_LOCATIONS:
      return {...state, locations: action.payload};

    case actions.SET_SELECTED_LOCATION:
      return {...state, selectedLocation: action.payload};

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const LocationsContext = React.createContext(null);

const LocationsHydrator = () => {
  const [, locationsDispatch] = useContext(LocationsContext);

  useEffect(() => {
    locationsDispatch({
      type: actions.SET_LOCATIONS,
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
