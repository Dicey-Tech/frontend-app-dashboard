import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => (
    <>
    <div>This is a test of the dashboard</div>
    <div>Push the link</div>
    <Link to={'class/34'}>Class 34</Link>
    <div className="clear"/>
    <div>another class link</div>
    <Link to={'/class/65'}>Class 65</Link>
    </>
);

export default TeacherDashboard