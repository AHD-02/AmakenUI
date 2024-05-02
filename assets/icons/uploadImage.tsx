import React from 'react';
import { Svg, Path } from 'react-native-svg';

const UploadImage = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
        stroke="#A5583A"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 9.50977L12 6.50977L15 9.50977"
        stroke="#A5583A"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 6.50977V14.5098"
        stroke="#A5583A"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 16.5098C9.89 17.8098 14.11 17.8098 18 16.5098"
        stroke="#A5583A"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default UploadImage;
