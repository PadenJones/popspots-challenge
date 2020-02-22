import React, {useContext, useState} from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Typography from "@material-ui/core/Typography";
import {LocationsActions, LocationsContext} from "../../contexts";

const copy = {
  searchHint: 'Search for a city, state, or postal code...',
};

const LocationSearchInput = () => {
  const [, locationsDispatch] = useContext(LocationsContext);
  const [state, setState] = useState({address: ''});

  const handleChange = address => {
    setState({address});
  };

  const handleSelect = async address => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);

      locationsDispatch({
        action: LocationsActions.SET_SELECTED_LOCATION,
        payload: {
          ...latLng,
          zoom: 10,
        },
      });
    } catch (e) {
      alert(`Oops: ${e.message()}`);
    }
  };

  return (
    <PlacesAutocomplete
      value={state.address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({getInputProps, suggestions, getSuggestionItemProps}) => {
        return (
          <>
            <Autocomplete
              options={suggestions}
              getOptionLabel={suggestion => suggestion.description}
              renderInput={params => (
                <TextField {...params} {...getInputProps()} variant="outlined" label={copy.searchHint} fullWidth/>
              )}
              renderOption={suggestion => (
                <Typography variant='body1' {...getSuggestionItemProps(suggestion)} style={{width: '100%'}}>
                  {suggestion.description}
                </Typography>
              )}
            />
          </>
        );
      }}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
