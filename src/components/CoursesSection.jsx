import React, { useState, useEffect } from 'react';
import { Container, Row } from '@edx/paragon';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getConfig } from '@edx/frontend-platform';
import SectionTitle from './SectionTitle';
import ExploreCard from './cards/ExploreCard';
import LmsApiService from '../app/services/LmsApiService';
import DiceySpinner from './DiceySpinner';
import DashboardCard from './cards/DashboardCard';

const fetchStudentCourses = async () => {
  const response = await LmsApiService.fetchStudentCourses();
  const { data } = response;
  const result = [];
  const courseEnrollments = data.map((element) => ({
    course_id: element.course_details.course_id,
  }));

  /* now fetch the individual course information including the image */
  /* eslint-disable no-restricted-syntax */
  /* eslint-disable no-await-in-loop */
  for (const element of courseEnrollments) {
    try {
      const course = await LmsApiService.fetchCourseInfo(element.course_id);

      result.push({
        course_id: element.course_id,
        name: course.data.name,
        description: course.data.short_description,
        media: course.data.media.image.small,
        start: Date.parse(course.data.start),
      });
    } catch {
      /* Skip that course */
    }
  }
  /* eslint-enable no-await-in-loop */
  /* eslint-enable no-restricted-syntax */
  return result;
};

const CoursesSection = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchStudentCourses().then((data) => {
      setCourses(data.sort((elemA, elemB) => elemB.start - elemA.start));
    })
      .catch((e) => {
        throw e;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  /* eslint-disable no-nested-ternary */
  const courseCards = isLoading ? <DiceySpinner />
    : courses.length === 0 ? (
      <div key="no-classrooms" className="col align-self-center d-inline">
        <h3>You are not enrolled in any courses</h3>
      </div>
    )
      : (
        <div key="course-list" className="card-scroll-region col">
          {courses.map((element) => {
            const lmsRoot = getConfig().LMS_BASE_URL;
            return (
              <DashboardCard
                key={element.course_id}
                name={element.name}
                description={element.description}
                media={element.media}
                url={`${lmsRoot}/courses/${element.course_id}/course`}
                actionBtnText="Start Now"
              />
            );
          })}
        </div>
      );
  /* eslint-enable no-nested-ternary */

  return (
    <Container className="section-container">
      <SectionTitle>My Courses</SectionTitle>
      <Row className="card-row px-2">
        {(getConfig().EXPLORE_COURSES_URL || '') !== ''
          ? <ExploreCard text="Find New Courses" icon={faSearch} /> : null}
        {courseCards}
      </Row>
    </Container>
  );
};

export default CoursesSection;
