import React from 'react';
import { Svg, Path } from 'react-native-svg';

const EditProfileIcon = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.04 3.01976L8.16 10.8998C7.86 11.1998 7.56 11.7898 7.5 12.2198L7.07 15.2298C6.91 16.3198 7.68 17.0798 8.77 16.9298L11.78 16.4998C12.2 16.4398 12.79 16.1398 13.1 15.8398L20.98 7.95976C22.34 6.59976 22.98 5.01976 20.98 3.01976C18.98 1.01976 17.4 1.65976 16.04 3.01976Z"
        stroke="white"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.91 4.1499C15.58 6.5399 17.45 8.4099 19.85 9.0899"
        stroke="white"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default EditProfileIcon;
