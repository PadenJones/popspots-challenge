import React, { useState } from 'react';
import { PinIcon } from './index';
import { Marker } from 'react-map-gl';
import { Popover, styled } from '@material-ui/core';
import { LocationListItem } from '../../LocationList';

const StyledLocationListItem = styled(LocationListItem)({
  pointerEvents: 'none',
});

const Pin = ({ location }) => {
  const [ anchorEl, setAnchorEl ] = useState();

  const handleClick = e => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Marker longitude={ location.lng } latitude={ location.lat }>
      <PinIcon onClick={ handleClick }/>
      <Popover
        open={ Boolean(anchorEl) }
        anchorEl={ anchorEl }
        onClose={ handleClose }
        anchorOrigin={ {
          vertical: 'bottom',
          horizontal: 'center',
        } }
      >
        <StyledLocationListItem { ...location } />
      </Popover>
    </Marker>
  );
};

export default Pin;
