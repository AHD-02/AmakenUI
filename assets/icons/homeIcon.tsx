
import * as React from 'react';
import Svg, { Path } from "react-native-svg";

const HomeIcon = () => {
  return (
    <Svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      //@ts-ignore
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M9.52 3.34001L4.13 7.54001C3.23 8.24001 2.5 9.73001 2.5 10.86V18.27C2.5 20.59 4.39 22.49 6.71 22.49H18.29C20.61 22.49 22.5 20.59 22.5 18.28V11C22.5 9.79001 21.69 8.24001 20.7 7.55001L14.52 3.22001C13.12 2.24001 10.87 2.29001 9.52 3.34001Z"
        stroke="#A5583A"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12.5 18.49V15.49"
        stroke="#A5583A"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
export default HomeIcon;