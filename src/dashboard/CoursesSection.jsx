import React, { useState, useEffect } from 'react';

import { Container, Row } from '@edx/paragon';
import { getConfig } from '@edx/frontend-platform';

import { ExploreCard, SectionTitle, DashboardCard, DiceySpinner } from '../common-components';

const CoursesSection  = () => {
  const [ready, setReady] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setReady(false);
    
  }, []);

  return (
    <Container className="section-container">
      <SectionTitle>My Projects</SectionTitle>
      <Row className="card-row px-2">
        <ExploreCard />
      </Row>
    </Container>
  );
};

export default CoursesSection;
