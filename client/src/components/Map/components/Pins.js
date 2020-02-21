/* eslint-disable react-hooks/exhaustive-deps */
import React, {useMemo} from 'react';
import {Pin} from '.';

const Pins = ({locations}) => useMemo(() => {
  return (
    locations.map((location) => (
      <Pin key={location.name} location={location}/>
    ))
  )
}, [locations]);

export default Pins;
