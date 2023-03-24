import React from 'react';
import { HashLoader } from 'react-spinners';

function LoadingSpinner({loading}) {
  return <HashLoader color="#0ea5e9"loading={loading} size={149} />
}

export default LoadingSpinner