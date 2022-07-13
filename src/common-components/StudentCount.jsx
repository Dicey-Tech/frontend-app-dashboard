import React from 'react';
import PropTypes from 'prop-types';

import { Image } from '@edx/paragon';

import StudentCountImage from '../assets/students.png';

const StudentCount = ({ studentCount }) => (
  <div className="student-count">
    <Image src={StudentCountImage} className="mr-2" />
    {studentCount}
  </div>
);

StudentCount.defaultProps = {
  studentCount: null,
};

StudentCount.propTypes = {
  studentCount: PropTypes.number,
};

export default StudentCount;