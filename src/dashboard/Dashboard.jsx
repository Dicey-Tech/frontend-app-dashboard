import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { injectIntl } from '@edx/frontend-platform/i18n';

import CoursesSection from './CoursesSection';
import { getCourseData, getEnrollmentData } from './data/actions';
import {
  enrollmentListSelector,
  coursesOverviewSelector,
  enrollmentCallSuccessSelector,
} from './data/selectors';

// TODO add classroom sections
// TODO add teaching sections
// TODO add tour
const DashboardPage = (props) => {
  const [ready, setReady] = useState(false);

  // Get user enrollments
  useEffect(() => {
    if (props.enrollmentList.length === 0 && !ready) {
      props.getEnrollmentData();
    }

    if (props.enrollmentList.length > 0) {
      const enrollments = props.enrollmentList.map((element) => ({
        course_id: element.course_details.course_id,
      }));

      props.getCourseData(enrollments);
    }
  }, [props.enrollmentList]);

  // Get projects
  useEffect(() => {
    if (props.enrollmentCallSuccess && props.coursesOverview.length === props.enrollmentList.length) {
      setReady(true);
    }
  }, [props.coursesOverview]);

  return (
    <CoursesSection
      hasEnrollments={props.enrollmentCallSuccess && (props.enrollmentList.length > 0)}
      isReady={ready}
      courses={props.coursesOverview}
    />
  );
};

DashboardPage.propTypes = {
  getEnrollmentData: PropTypes.func,
  getCourseData: PropTypes.func,
  coursesOverview: PropTypes.arrayOf(PropTypes.object),
  enrollmentList: PropTypes.arrayOf(PropTypes.string),
  enrollmentCallSuccess: PropTypes.bool,
};

DashboardPage.defaultProps = {
  getEnrollmentData: null,
  getCourseData: null,
  enrollmentList: [],
  coursesOverview: [],
  enrollmentCallSuccess: false,
};

const mapStateToProps = state => ({
  enrollmentList: enrollmentListSelector(state),
  coursesOverview: coursesOverviewSelector(state),
  enrollmentCallSuccess: enrollmentCallSuccessSelector(state),
});

export default connect(
  mapStateToProps,
  {
    getEnrollmentData,
    getCourseData,
  },
)(injectIntl(DashboardPage));
