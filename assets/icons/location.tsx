import * as React from 'react';
import Svg, { Path, Rect, Defs, ClipPath, G } from 'react-native-svg';

const LocationIcon = () => {
    return (
        <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
            <G clipPath="url(#clip0_28_1511)">
                <Path
                    d="M15.4651 6.3375C14.6776 2.8725 11.6551 1.3125 9.00007 1.3125C9.00007 1.3125 9.00007 1.3125 8.99257 1.3125C6.34507 1.3125 3.31507 2.865 2.52757 6.33C1.65007 10.2 4.02007 13.4775 6.16507 15.54C6.96007 16.305 7.98007 16.6875 9.00007 16.6875C10.0201 16.6875 11.0401 16.305 11.8276 15.54C13.9726 13.4775 16.3426 10.2075 15.4651 6.3375ZM9.00007 10.095C7.69507 10.095 6.63757 9.0375 6.63757 7.7325C6.63757 6.4275 7.69507 5.37 9.00007 5.37C10.3051 5.37 11.3626 6.4275 11.3626 7.7325C11.3626 9.0375 10.3051 10.095 9.00007 10.095Z"
                    fill="#8E8E93"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_28_1511">
                    <Rect width={18} height={18} fill="white" />
                </ClipPath>
            </Defs>
        </Svg>
    );
}

export default LocationIcon;