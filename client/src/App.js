import React from 'react';
import { Grid, Typography, styled } from '@material-ui/core';
import { LocationList, LocationSearchInput, Map } from './components';
import { LocationsContextProvider, TokensContextProvider } from './contexts';

const copy = {
  title: 'Find Popspots Advertising Locations',
};

const StyledGrid = styled(Grid)({
  margin: '50px auto',
  textAlign: 'center',
  width: '60%',
});

const App = () => (
  <TokensContextProvider>
    <LocationsContextProvider>
      <StyledGrid container direction="column" spacing={ 4 }>
        <Grid item>
          <Typography variant="h4">{copy.title}</Typography>
        </Grid>
        <Grid item>
          <LocationSearchInput/>
        </Grid>
        <Grid item container spacing={ 4 }>
          <Grid item xs={ 4 } style={ { height: '500px', overflow: 'auto' } }>
            <LocationList/>
          </Grid>
          <Grid item xs={ 8 } style={ { paddingTop: 0, paddingBottom: 0 } }>
            <Map/>
          </Grid>
        </Grid>
      </StyledGrid>
    </LocationsContextProvider>
  </TokensContextProvider>
);

export default App;