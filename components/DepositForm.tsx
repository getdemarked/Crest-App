// components/DepositForm.tsx

import React from 'react';
import { Box } from '@chakra-ui/react';

const DepositForm: React.FC = () => {
  return (
    <Box maxW={['full', '640px', '800px', '1024px', '100%']} mx="auto">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSe6KBXQSRH50hFiW0VUIHUPbfPV-SOdsUjab9Zd3OYDc60g_g/viewform?embedded=true"
        width="100%"
        height="800"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
      >
        Loading...
      </iframe>
    </Box>
  );
};

export default DepositForm;
