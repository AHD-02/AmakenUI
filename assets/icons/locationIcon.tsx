import React from 'react';
import Svg, { Path } from 'react-native-svg';

const LocationIcon = () => {
  return (
    <Svg width={12} height={14} viewBox="0 0 12 14" fill="none">
      <Path
        fill="#C8C8C8"
        d="M0.312866 6.12508C0.312866 2.93448 2.87571 0.729248 6.00037 0.729248C9.12503 0.729248 11.6879 2.93448 11.6879 6.12508C11.6879 8.55809 10.5996 10.3444 9.36365 11.5145C8.74732 12.098 8.09127 12.5317 7.50716 12.8212C6.93752 13.1036 6.39162 13.2708 6.00037 13.2708C5.60911 13.2708 5.06321 13.1036 4.49357 12.8212C3.90946 12.5317 3.25341 12.098 2.63708 11.5145C1.40113 10.3444 0.312866 8.55809 0.312866 6.12508ZM6.00037 8.16675C6.96686 8.16675 7.75037 7.38325 7.75037 6.41675C7.75037 5.45025 6.96686 4.66675 6.00037 4.66675C5.03387 4.66675 4.25037 5.45025 4.25037 6.41675C4.25037 7.38325 5.03387 8.16675 6.00037 8.16675Z"
      />
    </Svg>
  );
};

export default LocationIcon;
