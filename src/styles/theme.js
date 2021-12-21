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
    primary: '#ffffff',
    secondary: '#0221ba',
    text3: '#000',
    Heading: '#000000',
    subHeading: '#cacaca',
    detailsText: '#000000',
    inputBorder: '#ececec',
    percentageIndicator: '#0221ba',
    percentageBar: '#d4d4d4',
    copyrightText: '#b4b1b1',
    modalBackground: '#ffffff',
    connectborder: 'solid 1px #0221ba',
    title: '#000',
    focused: '#f1f1f1',
    bubblePositive: '#ffff',
    bubbleNegative: '#D22B2B',
    lightBackground: '#eaeeff',
    toggleBackground: '#0221ba',
    postBg: '#F9FAFF',
    postButtonBg: '#0221ba',
    postSecondry: '#FFFFFF',
    postPrimary: '#0221ba',
    postText: '#0e0e0e',
    green: '#6ed14b',
    red: '#ff2400',
    circle: '#ffffff',
    circleTrail: '#0221BA',
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
    Leftbackground: 'linear-gradient(162.58deg, #383359 21.71%, #353257 73.67%)',
    background: 'linear-gradient(162.58deg, #222032 21.71%, #141420 73.67%)',
    font: '#fff',
    logoFont:'#F4F9FD',
    totalLeftBg: '#153055',
    selectBg: 'linear-gradient(58.78deg, #6045AD 38.96%, #3C4399 67.79%)',
    selectFont: '#fff',
    itemDivBg: 'rgba(148, 115, 218, 0.15)',
    primary: '#0221ba',
    secondary: '#ffffff',
    text3: '#bdc3c7',
    Heading: '#ffffff',
    subHeading: '#cacaca',
    detailsText: '#ffffff',
    inputBorder: '#ffffff',
    percentageIndicator: '#ffffff',
    percentageBar: '#d4d4d4',
    copyrightText: '#ffffff',
    modalBackground: '#1a1a1a',
    connectborder: '1px solid #fff',
    title: '#ffffff',
    focused: '#75768d',
    bubblePositive: '#fff',
    bubbleNegative: '#d24a4a',
    lightBackground: '#eaeeff',
    toggleBackground: '#4d62ce',
    postBg: '#1D1E32',
    postButtonBg: '#FFFFFF',
    postSecondry: '#1D1E32',
    postPrimary: '#FFFFFF',
    green: '#6ed14b',
    red: '#ff2400',
    circle: '#202235',
  },
  boxShadow: '0 1px 4px 0 rgba(66, 66, 68, 0.5)',
  postShadow: '0 1px 20px 0 rgba(29, 30, 50, 1)',
  opacity: {
    logo: `0.40`,
  },
};
