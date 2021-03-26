import React from 'react';
import { useSelector } from 'react-redux';
import CardSection from '../components/CardSection';

const TeacherDashboard = () => {
  const classesTeaching = useSelector(state => state.teaching.classes);

  return (
    <>
      <div>This is a test of the dashboard</div>
      <CardSection sectionTitle="Currently Teaching" courses={classesTeaching} />
    </>
  );
};

export default TeacherDashboard;
