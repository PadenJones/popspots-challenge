/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from "react";

const RESOURCE_URL = '/api/secrets';

export const SecretsContext = React.createContext(null);

const SecretsHydrator = ({children}) => {
  const [secrets, setSecrets] = useContext(SecretsContext);

  useEffect(() => {
    fetch(RESOURCE_URL)
      .then(response => response.json())
      .then(setSecrets);
  }, []);

  return secrets ? children : null;
};

const SecretsContextProvider = ({children}) => (
  <SecretsContext.Provider value={useState()}>
    <SecretsHydrator>
      {children}
    </SecretsHydrator>
  </SecretsContext.Provider>
);

export default SecretsContextProvider;