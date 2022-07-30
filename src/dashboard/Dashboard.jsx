import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';

import CoursesSection from './CoursesSection';
import { getCourseData, getEnrollmentData } from './data/actions';
import { 
  enrollmentListSelector, 
  coursesOverviewSelector, 
  enrollmentCallSuccessSelector 
} from './data/selectors'
import { DEFAULT_STATE } from '../data/constants';

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
  intl: intlShape.isRequired,
  getEnrollmentList: PropTypes.func,
  getCoursesOverview: PropTypes.func,
  coursesOverview: PropTypes.arrayOf(PropTypes.object),
  enrollmentList: PropTypes.array,
  enrollmentCallSuccess: PropTypes.bool,
  showError: PropTypes.bool,
  shouldRedirect: PropTypes.bool,
  submitState: PropTypes.string,
};

DashboardPage.defaultProps = {
  enrollmentList: [],
  coursesOverview: [],
  shouldRedirect: false,
  enrollmentCallSuccess: false,
  showError: false,
  submitState: DEFAULT_STATE,
};

const mapStateToProps = state => ({
  enrollmentList: enrollmentListSelector(state),
  coursesOverview: coursesOverviewSelector(state),
  enrollmentCallSuccess: enrollmentCallSuccessSelector(state)
});

export default connect(
  mapStateToProps,
  {
    getEnrollmentData,
    getCourseData,
  },
)(injectIntl(DashboardPage));
