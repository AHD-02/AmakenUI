import * as React from "react"
import Svg, { Path } from "react-native-svg"

const CloseIcon = () => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M15.712 16.773L7.227 8.288a.755.755 0 010-1.061c.29-.29.77-.29 1.06 0l8.486 8.485c.29.29.29.771 0 1.061-.29.29-.77.29-1.06 0z"
        fill="#000"
      />
      <Path
        d="M7.227 16.773a.756.756 0 010-1.06l8.485-8.486c.29-.29.771-.29 1.061 0 .29.29.29.77 0 1.06l-8.485 8.486c-.29.29-.771.29-1.06 0z"
        fill="#000"
      />
    </Svg>
  )
}

export default CloseIcon
