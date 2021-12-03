import React from 'react';
import { Spinner } from '@edx/paragon';

const DiceySpinner = () => (
  <div className="col dicey-spinner">
    <div className="position-absolute start-50 top-50 translate-middle">
      <Spinner animation="border" variant="primary" />
    </div>
  </div>
);

export default DiceySpinner;
