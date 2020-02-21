/* eslint-disable react-hooks/exhaustive-deps */
import React, {useMemo} from 'react';
import {Marker} from 'react-map-gl';
import {PinIcon} from '.';

const Pins = ({locations, onClick}) => useMemo(() => {
  return (
    locations.map((location, index) => (
      <Marker key={`marker-${index}`} longitude={location.lng} latitude={location.lat}>
        <PinIcon onClick={() => onClick(location)}/>
      </Marker>
    ))
  )
}, [locations]);

export default Pins;
