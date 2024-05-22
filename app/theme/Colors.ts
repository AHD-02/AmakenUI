const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export const colors = {
  background: '#ededf2',
  inputBorder: '#F1F0F6',
  primary: '#A5583A',
  secondary: '#212121',
  grey: '#666666',
  white: '#FFFFFF',
  black: '#010101',
  errorRed: '#FF0000',
  babyBlue: '#8094e6',
  badgeBgGrey: '#9E9E9E',
  lightGray: '#E0E0E0',
  disabled: '#FFB3AD',
  lightGreen: '#EFF7F2',
  searchInputBg: '#F5F5F5',
  searchInput: '#BDBDBD',
  pinkBg: '#1bac4b14',
  greenBg: '#f7555514',
  yellowBg: '#ff980014',
  solidGray: '#CCCCCC',
  lightRed: '#FFA199',
  markerBg: '#1bac4b14',
  successGreen: '#4BB543',
};

const light = {
  themeColor: '#FFFFFF',
  primaryText: '#212121',
  secondaryText: '#616161',
  cardBackground: '#FFFFFF',
  iconBg: '#EFF7F2',
  inputBackground: '#FAFAFA',
  ...colors,
};

const dark = {
  themeColor: '#000000',
  primaryText: '#FFFFFF',
  secondaryText: '#E0E0E0',
  cardBackground: '#1F222A',
  iconBg: '#1C2623',
  inputBackground: '#1F222A',
  ...colors,
};

export default {light, dark};