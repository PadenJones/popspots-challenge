/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from "react";

const RESOURCE_URL = '/api/tokens';

export const TokensContext = React.createContext(null);

const TokensHydrator = ({children}) => {
  const [secrets, setSecrets] = useContext(TokensContext);

  useEffect(() => {
    fetch(RESOURCE_URL)
      .then(response => response.json())
      .then(setSecrets);
  }, []);

  return secrets ? children : null;
};

const TokensContextProvider = ({children}) => (
  <TokensContext.Provider value={useState()}>
    <TokensHydrator>
      {children}
    </TokensHydrator>
  </TokensContext.Provider>
);

export default TokensContextProvider;