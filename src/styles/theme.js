const space = [0, 4, 8, 16, 32, 40, 44, 50, 64, 128, 256, 512];
const breakpoints = ['22.625em', '30em', '37.500em', '48em', '56.25em', '59.125em', '61.25em', '68.75em', '75.000em'];
const fontSizes = [12, 14, 16, 20, 22, 24, 26, 32, 36, 40, 48, 60, 68, 70];
const lineHeights = [15, 17.5, 20, 25, 30, 40];

export const lightTheme = {
  space,
  breakpoints,
  fontSizes,
  lineHeights,
  colors: {
    Leftbackground: '#ffffff',
    background: 'linear-gradient(157.98deg, #F1F9FF 7.94%, #E7F7F4 34.28%, #F4F9FD 53.49%)',
    font: '#153055',
    logoFont:'#3F434A',
    totalLeftBg: 'linear-gradient(123.34deg,#304FFD 7.62%,#74C5FF 97.61%)',
    selectBg: 'linear-gradient(91.11deg, #EEF1FF 14.08%, #FFF3EF 98.54%)',
    selectFont: '#3F434A',
    itemDivBg: '#fff',
    statisticsBg: '#fff',
    totalFont: '#304FFD',
    lableFont: '#7B84A3',
  },
  boxShadow: '0 1px 10px 0 rgba(225, 221, 221, 0.5)',
  postShadow: '0 1px 3px 0 rgba(225, 221, 221, 0.5)',
  opacity: {
    logo: `0.25`,
  },
};

export const darkTheme = {
  space,
  breakpoints,
  fontSizes,
  lineHeights,
  colors: {
    Leftbackground: '#262A4F',
    background: 'linear-gradient(162.58deg, #222032 21.71%, #141420 73.67%)',
    font: '#fff',
    logoFont:'#F4F9FD',
    totalLeftBg: 'linear-gradient(162.58deg, #212A5C 21.71%, #373359 73.67%)',
    selectBg: 'linear-gradient(58.78deg, #6045AD 38.96%, #3C4399 67.79%)',
    selectFont: '#fff',
    itemDivBg: 'rgba(148, 115, 218, 0.15)',
    statisticsBg: 'linear-gradient(162.58deg, #3A395B 21.71%, #29293F 73.67%)',
    totalFont: '#FFF',
    lableFont: '#bfbbc8',
  },
  boxShadow: '0 1px 4px 0 rgba(66, 66, 68, 0.5)',
  postShadow: '0 1px 20px 0 rgba(29, 30, 50, 1)',
  opacity: {
    logo: `0.40`,
  },
};
