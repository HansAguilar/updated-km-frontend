import React from 'react';
import { HashLoader } from 'react-spinners';

function LoadingSpinner({ loading }) {
  return <HashLoader color="#3B82F6" loading={loading} size={149} />
}

export default LoadingSpinner