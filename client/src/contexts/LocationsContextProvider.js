/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useReducer} from 'react';

const RESOURCE_URL = '/api/locations';

export const LocationsContext = React.createContext(null);

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

const LocationsSearch = () => {
  const [{selectedLocation}, locationsDispatch] = useContext(LocationsContext);

  useEffect(() => {
      let uri = RESOURCE_URL;

      if (selectedLocation) {
        const {lat, lng} = selectedLocation;
        uri += `?lat=${lat}&lng=${lng}`;
      }

      fetch(uri)
        .then(response => response.json())
        .then(results => {
          locationsDispatch({
            action: actions.SET_LOCATIONS,
            payload: results.slice(0, 200),
          })
        });
  }, [selectedLocation]);

  return null;
};

const LocationsContextProvider = ({children}) => (
  <LocationsContext.Provider value={useReducer(reducer, initialState)}>
    <LocationsSearch/>
    {children}
  </LocationsContext.Provider>
);

export default LocationsContextProvider;
