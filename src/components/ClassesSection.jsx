import React, { useState, useEffect } from 'react';
import { Container, Row, Spinner } from '@edx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import ClassroomApiService from '../app/services/ClassroomApiService';
import DashboardCard from './cards/DashboardCard';
import NewClassCard from './cards/NewClassCard';

const ClassesSection = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const doCall = async () => ClassroomApiService.getAllClassrooms();

    try {
      setIsLoading(true);
      doCall().then((result) => {
        console.log(result.data, 'classrooms');
        setClasses(result.data.results);
      });
    } catch {
      alert('There was an error fetching the list of classrooms');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const classCards = classes.map((element) => {
    const classUrl = `${getConfig().CLASSROOM_MFE_URL}/${element.uuid}`;
    return (
      <div className="p-2" style={{ display: 'inline-block', float: 'none' }}>
        <DashboardCard
          key={element.uuid}
          media="/public/images/classroom.png"
          name={element.name}
          actionBtnText="Open Class"
          url={classUrl}
          studentCount={10}
        />
      </div>
    );
  });

  return (
    <>
      <Container>
        <Row>
          <h1>My Classes</h1>
        </Row>
        <Row className="px-2">
          <div key="new-class-card" className="d-inline-block pt-2 pb-2 mr-2"><NewClassCard text="New Class" icon={faPlusCircle} /></div>
          {isLoading && (
            <div className="col align-self-center d-inline-block">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
          {!isLoading && classes.length === 0 ? (
            <div key="no-classrooms" className="col align-self-center d-inline-block">
              <h2>No Classroom! Use the Add Classroom button to create one!</h2>
            </div>
          ) : (
            <div key="classroom-list" className="col d-inline-block" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
              {classCards}
            </div>
          )}
        </Row>
      </Container>
    </>
  );
};

export default ClassesSection;
