/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useMemo } from 'react';
import { List } from '@material-ui/core';
import { LocationListItem } from '.';

import { LocationsContext, LocationsActions } from '../../contexts';

const LocationList = () => {
  const [ { locations }, locationsDispatch ] = useContext(LocationsContext);

  const memoizedLocationItems = useMemo(() => locations.map(location => (
    <LocationListItem key={ location.name } { ...location } onClick={ () => setSelectedLocation(location) }/>
  )), [ locations ]);

  const setSelectedLocation = (location) => {
    locationsDispatch({
      action: LocationsActions.SET_SELECTED_LOCATION,
      payload: location,
    })
  };

  return (
    <List style={ { overflowX: 'hidden' } }>
      {memoizedLocationItems}
    </List>
  )
};

export default LocationList;
