import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import fetchClassData from '../data/actions/classData';

//const studentBox = { float: 'left', width: '30%', border: '1px solid black' };
//const classBox = { float: 'left', border: '1px solid black' };

const selectClass = () => useSelector(state => state.classData);

const  ClassDashboard = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchClassData(props.match.params.classId, dispatch)
  },[])

  
    const classData = selectClass();

    const studentList = classData.students.map(student => (
      <li className="list-group-item" key={student.id}>
        <span>{student.lastName}</span>&nbsp;<span>{student.firstName}</span>
      </li>
    ));

    return (
      <div className='container container-lg px-3'>
        <div className="row">

        <h2>{classData.name}</h2>
        </div>
        <div className="row gx">
          <div className="col">
            <div className="card rounded-3 w-75 shadow">
            <div className="card-body">
              <h5 className="card-title">Your Students</h5>
              <ul className="list-group list-group-flush">
              {studentList}
              </ul>
            </div>
            </div>
          </div>
          <div className="col">
            <div className="card rounded-3 shadow w-100"  >
            
            <div className="card-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col">
                    <img src={`/public/images/${classData.media}`} className="card-img-left"/>
                  </div>
                  <div className="col" style={{width: '40em'}} >
                    <h5 className="card-title">{classData.name}</h5>
                    <p>{classData.description}</p>

                  </div>
                </div>
              </div>

            </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default withRouter(ClassDashboard);
