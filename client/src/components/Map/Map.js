/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import MapGL from 'react-map-gl';
import {LocationsContext, LocationsActions, TokensContext} from "../../contexts";
import {Pins} from "./components";

import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  const [{ MAPBOX_TOKEN }] = useContext(TokensContext);
  const [{locations, selectedLocation}, locationsDispatch] = useContext(LocationsContext);

  const [viewport, setViewport] = useState({
    latitude: 37.785164,
    longitude: -100,
    zoom: 3,
    bearing: 0,
    pitch: 0
  });

  const setLocation = (location) => {
    locationsDispatch({
      action: LocationsActions.SET_SELECTED_LOCATION,
      payload: location,
    })
  };

  useEffect(() => {
    if (selectedLocation) {
      setViewport({
        ...viewport,
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
        zoom: selectedLocation.zoom || 17,
      });
    }
  }, [selectedLocation]);

  return (
    <MapGL
      {...viewport}
      onViewportChange={setViewport}
      height='100%'
      width='100%'
      mapStyle='mapbox://styles/mapbox/streets-v11'
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      <Pins locations={locations} onClick={setLocation}/>
    </MapGL>
  );
};

export default Map;
