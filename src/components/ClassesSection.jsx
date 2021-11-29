import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, Spinner,
} from '@edx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import ClassroomApiService from '../app/services/ClassroomApiService';
import DashboardCard from './cards/DashboardCard';
import NewClassCard from './cards/NewClassCard';

const fetchClassroomsData = async () => {
  const response = await ClassroomApiService.getAllClassrooms();
  const classrooms = [...response.data.results];
  /* now we need to loop and fetch the student count */
  /* eslint-disable no-restricted-syntax */
  /* eslint-disable no-await-in-loop */
  for (const classroom of classrooms) {
    try {
      const classroomResponse = await ClassroomApiService.fetchClassroomEnrollment(classroom.uuid);
      classroom.studentCount = classroomResponse.data.count;
    } catch {
      /* no student count */
      classroom.studentCount = null;
    }
  }
  /* eslint-enable no-restricted-syntax */
  /* eslint-enable no-await-in-loop */
  return classrooms;
};

const ClassesSection = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchClassroomsData().then((result) => {
      console.log(result, 'classrooms');
      setClasses(result);
    }).catch(() => {
      alert('There was an error fetching the list of classrooms');
    }).finally(() => setIsLoading(false));
  }, []);

  /* eslint-disable no-nested-ternary */
  const classCards = isLoading ? (
    <div className="col align-self-center d-inline-block">
      <Spinner animation="border" variant="primary" />
    </div>
  )
    : classes.length === 0 ? (
      <div key="no-classrooms" className="col align-self-center d-inline-block">
        <h2>No Classrooms!</h2><h4>Use the Add Classroom button to create one!</h4>
      </div>
    ) : (
      <div key="classroom-list" className="col card-scroll-region">
        {classes.map((element) => (
          <DashboardCard
            key={element.uuid}
            media="/public/images/classroom.png"
            name={element.name}
            actionBtnText="Open Class"
            url={`${getConfig().CLASSROOM_MFE_URL}/${element.uuid}`}
            studentCount={element.studentCount}
          />
        ))}
      </div>
    );
  /* eslint-enable no-nested-ternary */
  return (
    <Container>
      <Row>
        <Col>
          <h2>My Classes</h2>
        </Col>
      </Row>
      <Row className="card-row px-2">
        <div key="new-class-card" className="d-inline-block pt-2 pb-2 mr-2"><NewClassCard text="New Class" icon={faPlusCircle} /></div>
        {classCards}
      </Row>
    </Container>
  );
};

export default ClassesSection;
