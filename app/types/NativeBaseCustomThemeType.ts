import {extendTheme} from 'native-base';
import { Colors } from '../theme';

export const customTheme = extendTheme({
  colors: Colors,
  fonts: {
    urbanist: 'Urbanist-Regular',
  },
});

export type CustomThemeType = typeof customTheme;

export type ColorsType = typeof customTheme.colors;
