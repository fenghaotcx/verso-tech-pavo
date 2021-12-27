import styled from 'styled-components';
import React, { useState, useEffect, createContext } from 'react';
import LeftBar from './components/desktop/LeftBar';
import { ApolloProvider } from '@apollo/client';
import ContentRight from './components/desktop/ContentRight';
import { lightTheme, darkTheme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import { LIGHT_THEME, DARK_THEME } from './constants';
import useMobileDown from './hooks/useMobileDown';
import useWindowSize from './hooks/useWindowSize';
import { useLocation  } from "react-router-dom";
import { useApollo } from './lib/apolloClient';
import { WalletConnectProvider,AssetsDataProvider } from './providers';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  color: ${({theme})=> theme.colors.font};
`

// function reducer(state, action) {
//   switch (action.type) {
//     case 'set_rate':
//       return {...state, rate: action.payload}
//     default:
//       throw new Error();
//   }
// }

export const GlobalContext = createContext({})

function App() {
  const apolloClient = useApollo()
  const isMobile = useMobileDown()
  const [theme, setTheme] = useState(LIGHT_THEME);
  const [isopen,setShow] = useState(false)
  const {windowWidth} = useWindowSize()
  const params = useLocation();
  // console.log('apolloClient========',apolloClient);
  console.log('params====',params);
  // console.log('AssetsDataProvider=======',AssetsDataProvider);
  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      setTheme(currentTheme);
    }
    // console.log('darkTheme=======',darkTheme);
    // console.log('lightTheme=======',lightTheme);
  }, [isMobile]);

  const toggleDrawer = open => {
    setShow(open)
  };

  const changeTheme = () => {
    if (theme === LIGHT_THEME) {
      setTheme(DARK_THEME);
      localStorage.setItem('theme', DARK_THEME);
    } else {
      setTheme(LIGHT_THEME);
      localStorage.setItem('theme', LIGHT_THEME);
    }
  };

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme === LIGHT_THEME ? lightTheme : darkTheme}>
        <GlobalContext.Provider value={{isMobile,toggleDrawer,isopen,changeTheme,theme,windowWidth}}>
          <WalletConnectProvider>
            <AssetsDataProvider>
              <Container>
                <LeftBar />
                <ContentRight theme={theme} isMobile={isMobile} />
              </Container>
            </AssetsDataProvider>
          </WalletConnectProvider>
        </GlobalContext.Provider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
