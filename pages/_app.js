import { UserContext } from '../context/user-context';
import React from "react";

function GlobalStyle() {
  return (
    <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
          font-family: 'Open Sans', sans-serif;
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */ 
      `}</style>
  );
}

export default function MyApp({ Component, pageProps }) {
  const [userName, setUserName] = React.useState('phsantiago32');
  const [name, setName] = React.useState('Pedro');
  const value = React.useMemo(
    () => ({ userName, setUserName, name, setName }),
    [userName, name]
  );
  

  return (
    <>
      <UserContext.Provider value={value}>
        <GlobalStyle />
        <Component {...pageProps} />
      </UserContext.Provider>
    </>
  );
}