import PropTypes from 'prop-types';
import React from 'react';
import { Image } from '@edx/paragon';

const StudentCount = ({ studentCount }) => (
  <div className="student-count">
    <Image src="/public/images/students.png" className="mr-2" />
    {studentCount}
  </div>
);

export default StudentCount;

StudentCount.defaultProps = {
  studentCount: null,
};

StudentCount.propTypes = {
  studentCount: PropTypes.number,
};
