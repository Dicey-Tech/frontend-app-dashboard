import { getConfig } from '@edx/frontend-platform';
import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, Spinner,
} from '@edx/paragon';
import LmsApiService from '../app/services/LmsApiService';
import DashboardCard from './cards/DashboardCard';

const TeachingSection = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await LmsApiService.fetchCoursesTeaching();
      /* clean up the data returned */
      const result = response.data.results.map((course) => ({
        name: course.name,
        uuid: course.id,
        media: course.media.image.small,
        description: course.short_description,
        url: `${getConfig().GRADEBOOK_URL}/${course.course_id}`,

      }));
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
    <div key="teaching-loading" className="align-self-center d-inline">
      <Spinner animation="border" variant="primary" />
    </div>
  )
    : courses.length === 0 ? (
      <div key="teaching-empty" className="col align-self-center d-inline">
        <h4>You are not teaching any courses</h4>
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
    <Container>
      <Row>
        <Col>
          <h2>Currently Teaching</h2>
        </Col>
      </Row>
      <Row className="card-row px-2">
        {courseCards}
      </Row>
    </Container>
  );
};

export default TeachingSection;
