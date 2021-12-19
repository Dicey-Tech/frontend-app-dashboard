import { getConfig } from '@edx/frontend-platform';
import React, { useState, useEffect } from 'react';
import {
  Container, Row,
} from '@edx/paragon';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import LmsApiService from '../app/services/LmsApiService';
import DashboardCard from './cards/DashboardCard';
import SectionTitle from './SectionTitle';
import DiceySpinner from './DiceySpinner';

const TeachingSection = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const { username } = getAuthenticatedUser();
      const response = await LmsApiService.fetchCoursesTeaching(username);
      /* we only get course_ids - we need to get the data for each */
      const result = [];
      /* eslint-disable no-restricted-syntax */
      /* eslint-disable no-await-in-loop */
      for (const courseId of response.data.results) {
        try {
          const course = await LmsApiService.fetchCourseInfo(courseId);
          result.push({
            name: course.data.name,
            uuid: course.data.id,
            media: course.data.media.image.small,
            description: course.data.short_description,
            url: `${getConfig().GRADEBOOK_URL}/${course.course_id}`,
          });
        } catch {
          /* skip that course */
        }
      }
      /* eslint-enable no-restricted-syntax */
      /* eslint-enable no-await-in-loop */
      return result;
    };

    setIsLoading(true);
    getData().then((data) => {
      setCourses(data);
    })
      .catch(() => alert('An error occured fetching the courses you are teaching.'))
      .finally(() => setIsLoading(false));
  }, []);

  /* eslint-disable no-nested-ternary */
  const courseCards = isLoading ? (
    <DiceySpinner />
  )
    : courses.length === 0 ? (
      <div key="teaching-empty" className="col align-self-center d-inline">
        <h4>You are not teaching any courses.</h4>
      </div>
    ) : (
      <div key="teaching-list" className="card-scroll-region col">
        {courses.map((element) => (
          <DashboardCard
            key={element.uuid}
            name={element.name}
            description={element.description}
            media={element.media}
            url={element.url}
            actionBtnText="View Grades"
          />
        ))}
      </div>
    );
  /* eslint-enable no-nested-ternary */
  return (
    <Container className="section-container">
      <SectionTitle>Currently Teaching</SectionTitle>
      <Row className="card-row px-2">
        {courseCards}
      </Row>
    </Container>
  );
};

export default TeachingSection;
