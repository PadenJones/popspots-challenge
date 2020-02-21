import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Grid, styled} from "@material-ui/core";

/*
    "name": "City Produce Company, Inc - #1",
    "city": "Ardmore",
    "state": "OK",
    "address": "202 Mill Street Southeast",
    "zip": "73401",
    "lat": 34.1686984,
    "lng": -97.1281561
*/

const StyledGrid = styled(Grid)({
  borderBottom: '1px solid gray',
  cursor: 'pointer',
  left: '0',
  padding: '3px 6px',
  position: 'relative',
  transition: 'left 0.2s ease',

  '&:hover': {
    backgroundColor: 'azure',
    left: '1%',
  }
});

const LocationListItem = ({name, address, city, state, zip, ...props}) => {
  return (
    <StyledGrid container direction='column' style={{textAlign: 'left'}} {...props}>
      <Grid item>
        <Typography variant='body1' color='textPrimary'>{name}</Typography>
      </Grid>
      <Grid item>
        <Typography variant='body2' color='textSecondary'>{address}</Typography>
      </Grid>
      <Grid item>
        <Typography variant='body2' color='textSecondary'>{`${city}, ${state} ${zip}`}</Typography>
      </Grid>
    </StyledGrid>
  );
};

export default LocationListItem;
