import React, { useState, useEffect } from 'react';
import {
  Container, Row,
} from '@edx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import ClassroomApiService from '../app/services/ClassroomApiService';
import DashboardCard from './cards/DashboardCard';
import NewClassCard from './cards/NewClassCard';
import SectionTitle from './SectionTitle';
import DiceySpinner from './DiceySpinner';

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
    fetchClassroomsData()
      .then((result) => {
        console.log(result, 'classrooms');
        setClasses(result);
      })
      .catch(() => {
        alert('There was an error fetching the list of classrooms');
      })
      .finally(() => setIsLoading(false));
  },
  []);
  /* eslint-disable no-nested-ternary */

  const classCards = isLoading ? (
    <DiceySpinner />
  )
    : classes.length === 0 ? (
      <div key="no-classrooms" className="col align-self-center d-inline">
        <h3>No Classrooms</h3><h5>Use the New Class button to create one!</h5>
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
    <Container className="section-container">
      <SectionTitle>My Classes</SectionTitle>
      <Row className="card-row px-2">
        <div key="new-class-card" className="d-inline-block pb-2 mr-2"><NewClassCard text="New Class" icon={faPlusCircle} /></div>
        {classCards}
      </Row>
    </Container>
  );
};

export default ClassesSection;
