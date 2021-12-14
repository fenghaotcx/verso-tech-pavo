import styled from 'styled-components'
import React, { useState, useEffect, createContext } from 'react';
import LeftBar from './components/desktop/LeftBar'
import ContentRight from './components/desktop/ContentRight'
import { lightTheme, darkTheme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import { LIGHT_THEME, DARK_THEME } from './constants';
import useMobileDown from './hooks/useMobileDown';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
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
  const isMobile = useMobileDown()
  const [theme, setTheme] = useState(LIGHT_THEME);

  const changeTheme = () => {
    if (theme === LIGHT_THEME) {
      setTheme(DARK_THEME);
      localStorage.setItem('theme', DARK_THEME);
    } else {
      setTheme(LIGHT_THEME);
      localStorage.setItem('theme', LIGHT_THEME);
    }
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      setTheme(currentTheme);
    }
  }, []);


  return (
    <ThemeProvider theme={theme === LIGHT_THEME ? lightTheme : darkTheme}>
      <GlobalContext.Provider value={{isMobile}}>
        <Container>
          <LeftBar changeTheme={changeTheme}/>
          <ContentRight isMobile={isMobile}/>
        </Container>
      </GlobalContext.Provider>
    </ThemeProvider>
  );
}

export default App;
