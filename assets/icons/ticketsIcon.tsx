import Svg, { Path } from "react-native-svg";

const TicketsIcon = () => {
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
        d="M19.8334 13C19.8334 11.62 20.9534 10.5 22.3334 10.5V9.5C22.3334 5.5 21.3334 4.5 17.3334 4.5H7.33337C3.33337 4.5 2.33337 5.5 2.33337 9.5V10C3.71337 10 4.83337 11.12 4.83337 12.5C4.83337 13.88 3.71337 15 2.33337 15V15.5C2.33337 19.5 3.33337 20.5 7.33337 20.5H17.3334C21.3334 20.5 22.3334 19.5 22.3334 15.5C20.9534 15.5 19.8334 14.38 19.8334 13Z"
        stroke="#DCDCDC"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10.3334 4.5L10.3334 20.5"
        stroke="#DCDCDC"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray="5 5"
      />
    </Svg>
  );
};
export default TicketsIcon;
