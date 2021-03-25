import React from 'react';
import { withRouter } from 'react-router';

const ClassDashboard = ({match}) => (
    <>
    <div>This is a test of the class details</div>
    <h2>{match.params.classId}</h2>
    <p>This is a test</p>
    </>
);

export default withRouter(ClassDashboard)