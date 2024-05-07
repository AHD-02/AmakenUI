import React from "react";
import Svg, { Path } from "react-native-svg";

const HomeIcon = ({borderColor}: {borderColor?: string}) => {
  return (
    <Svg width={"25"} height={"25"} viewBox="0 0 25 25" fill={'none'} color={'#A5583A'}> 
      <Path
        d="M9.52 3.34004L4.13 7.54004C3.23 8.24004 2.5 9.73004 2.5 10.86V18.27C2.5 20.59 4.39 22.49 6.71 22.49H18.29C20.61 22.49 22.5 20.59 22.5 18.28V11C22.5 9.79004 21.69 8.24004 20.7 7.55004L14.52 3.22004C13.12 2.24004 10.87 2.29004 9.52 3.34004Z"
        stroke={borderColor ?? "#DCDCDC"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.5 18.49V15.49"
        stroke={borderColor ?? "#DCDCDC"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default HomeIcon;
