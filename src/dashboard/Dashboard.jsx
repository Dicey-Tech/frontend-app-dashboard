import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container, Row } from '@edx/paragon';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';

import { ExploreCard, SectionTitle, DashboardCard, DiceySpinner } from '../common-components';
import { getCourseData, getEnrollmentData } from './data/actions';
import { enrollmentListSelector, coursesOverviewSelector } from './data/selectors'
import { DEFAULT_STATE } from '../data/constants';

const DashboardPage = (props) => {
  const [enrollmentList, setEnrollmentList] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [ready, setReady] = useState(false);

  // Get user enrollments
  useEffect(() => {
    if (props.enrollmentList.length === 0 && !ready) {
      props.getEnrollmentData();
    }

    if (props.enrollmentList.length > 0) {
      setEnrollmentList(props.enrollmentList)
    }
  }, [props.enrollmentList])

  // Get courses overview
  useEffect(() => {
    enrollmentList.forEach((enrollment) => {
      props.getCourseData(enrollment.course_details.course_id);
    });

    return () => {
      if (enrollmentList.length === coursesList.length) {
        console.log("clear list")
        setCoursesList([])
      }
    }
  }, [enrollmentList])
  
  useEffect(() => {
    setCoursesList(props.coursesList)
  
    return () => {
      
    }
  }, [props.coursesList])
  

  return (
    <Container className="section-container">
      <SectionTitle>My Projects</SectionTitle>
      <Row className="card-row px-2">
        <ExploreCard />
      </Row>
    </Container>
  );
};

DashboardPage.propTypes = {
  intl: intlShape.isRequired,
  getEnrollmentList: PropTypes.func.isRequired,
  getCoursesOverview: PropTypes.func.isRequired,
  coursesOverview: PropTypes.arrayOf(PropTypes.object),
  enrollmentList: PropTypes.array,
  showError: PropTypes.bool,
  shouldRedirect: PropTypes.bool,
  submitState: PropTypes.string,
};

DashboardPage.defaultProps = {
  enrollmentList: [],
  coursesOverview: [],
  shouldRedirect: false,
  showError: false,
  submitState: DEFAULT_STATE,
};

const mapStateToProps = state => ({
  enrollmentList: enrollmentListSelector(state),
  coursesOverview: coursesOverviewSelector(state),
});

export default connect(
  mapStateToProps,
  {
    getEnrollmentData,
    getCourseData,
  },
)(injectIntl(DashboardPage));
