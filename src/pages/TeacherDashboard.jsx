import React from 'react';
import { useSelector } from 'react-redux';
import CardSection from '../components/CardSection';
import ClassesSection
  from '../components/ClassesSection';

const TeacherDashboard = () => {
  const classesTeaching = useSelector(state => state.teaching.classes);

  return (
    <>
      <ClassesSection />
      <CardSection sectionTitle="Currently Teaching" courses={classesTeaching} />
    </>
  );
};

export default TeacherDashboard;
