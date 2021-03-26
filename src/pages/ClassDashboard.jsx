import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import fetchClassData from '../data/actions/classData';

const studentBox = { float: 'left', width: '30%', border: '1px solid black' };
const classBox = { float: 'left', border: '1px solid black' };

const selectClass = ({ classId }) => useSelector(state => state.classData);

const ClassDashboard = ({ match, props }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchClassData());
  }, [dispatch]);

  const classData = selectClass(match.params.classId);

  const studentList = classData.students.map(student => (
    <div className="clear" key={student.id}>
      <span>{student.lastName}</span>&nbsp;<span>{student.firstName}</span>
    </div>
  ));

  return (
    <>
      <div>This is a test of the class details</div>
      <h2>{classData.name}</h2>
      <div style={studentBox}>
        {studentList}
      </div>
      <div style={classBox}>
        <h3>{classData.name}</h3>
        <p>{classData.description}</p>
      </div>
      <div className="clearfix" />
      <div>
        <p>This is a test</p>
      </div>
    </>
  );
};

export default withRouter(ClassDashboard);
