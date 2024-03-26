import React from 'react';
import {Box, Text, WarningIcon} from 'native-base';

type Props = {
  title: string;
  stylingBox?: any;
  warningIcon?:boolean;
 
};
const WarningMessage: React.FC<Props> = ({stylingBox, title,warningIcon}) => {

  return (
    <Box flexDirection={'row'} alignItems={'center'} style={stylingBox}>
      {warningIcon!==false&&<WarningIcon color={'#FF0000'} size="xs" />}
      <Text color={'#FF0000'} zIndex={2} fontSize={10}>
        {'  '}
        {title}
      </Text>
    </Box>
  );
};
export default WarningMessage;
