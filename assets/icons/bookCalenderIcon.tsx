import * as React from "react"
import Svg, { Path } from "react-native-svg"

const BookCalenderIcon = ({isPrimary}: {isPrimary?: boolean}) => {
  return (
    <Svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
    >
      <Path
        d="M8.375 1.78V1A.378.378 0 008 .625.378.378 0 007.625 1v.75h-3.25V1A.378.378 0 004 .625.378.378 0 003.625 1v.78c-1.35.125-2.005.93-2.105 2.125-.01.145.11.265.25.265h8.46c.145 0 .265-.125.25-.265-.1-1.195-.755-2-2.105-2.125zM10 4.92H2c-.275 0-.5.225-.5.5V8.5C1.5 10 2.25 11 4 11h4c1.75 0 2.5-1 2.5-2.5V5.42c0-.275-.225-.5-.5-.5zM4.605 9.105a.577.577 0 01-.165.105.498.498 0 01-.19.04.498.498 0 01-.19-.04.577.577 0 01-.165-.105.526.526 0 01-.145-.355c0-.13.055-.26.145-.355a.577.577 0 01.165-.105.5.5 0 01.38 0c.06.025.115.06.165.105.09.095.145.225.145.355 0 .13-.055.26-.145.355zM4.71 7.19a.577.577 0 01-.105.165.577.577 0 01-.165.105.498.498 0 01-.19.04.498.498 0 01-.19-.04.577.577 0 01-.165-.105.577.577 0 01-.105-.165.498.498 0 01-.04-.19c0-.065.015-.13.04-.19a.577.577 0 01.105-.165.577.577 0 01.165-.105.5.5 0 01.38 0c.06.025.115.06.165.105.045.05.08.105.105.165.025.06.04.125.04.19s-.015.13-.04.19zm1.645.165a.577.577 0 01-.165.105.498.498 0 01-.19.04.498.498 0 01-.19-.04.577.577 0 01-.165-.105A.526.526 0 015.5 7c0-.13.055-.26.145-.355a.577.577 0 01.165-.105.458.458 0 01.38 0c.06.025.115.06.165.105.09.095.145.225.145.355 0 .13-.055.26-.145.355z"
        fill={isPrimary ? "#A5583A" : "#8E8E93"}
      />
    </Svg>
  )
}

export default BookCalenderIcon
