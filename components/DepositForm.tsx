// components/DepositForm.tsx

import React from 'react';

const DepositForm: React.FC = () => {
  return (
    <div>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSe6KBXQSRH50hFiW0VUIHUPbfPV-SOdsUjab9Zd3OYDc60g_g/viewform?embedded=true"
        width="640"
        height="800"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
      >
        Loading...
      </iframe>
    </div>
  );
};

export default DepositForm;
